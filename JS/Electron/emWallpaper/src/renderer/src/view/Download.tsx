import { Select } from 'antd'
import { DownloadOutlined, ClearOutlined, SearchOutlined } from '@ant-design/icons'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@renderer/store'
import { addBatchTasks, updateProgress, retryTask, cancelTask, removeTask, clearCompleted, type DownloadTask } from '@renderer/store/download'
import { setActiveProject } from '@renderer/store/config'
import { setUrlsText, setVideoInfo, setScannedAssets, setIsBili, setSelectedQuality, setSelectedPartIdx, setDownloading, setAutoScan, toggleScannedAsset, toggleEpisode, selectAllEpisodes, type VideoPart, type VideoFormat } from '@renderer/store/session'
import { useToast } from '@renderer/hooks/useToast'
import { Button } from '@renderer/components/ui/Button'
import { Tag } from '@renderer/components/ui/Card'
import { sanitizeFilename } from '@renderer/utils/format'
import TaskItem from '@renderer/components/TaskItem'

const BILI_PATTERN = /bilibili\.com|b23\.tv|BV[a-zA-Z0-9]{10}|av\d+/i
const YT_PATTERN = /youtube\.com|youtu\.be/i

export default function Download() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const toast = useToast()
  const savePath = useSelector((s: RootState) => s.config.savePath)
  const projects = useSelector((s: RootState) => s.config.projects) || []
  const activeProject = useSelector((s: RootState) => s.config.activeProject) || 'default'
  const tasks = useSelector((s: RootState) => s.download.tasks) || []

  const urlsText = useSelector((s: RootState) => s.session.urlsText)
  const videoInfo = useSelector((s: RootState) => s.session.videoInfo)
  const scannedAssets = useSelector((s: RootState) => s.session.scannedAssets)
  const isBili = useSelector((s: RootState) => s.session.isBili)
  const selectedQuality = useSelector((s: RootState) => s.session.selectedQuality)
  const selectedPartIdx = useSelector((s: RootState) => s.session.selectedPartIdx)
  const downloading = useSelector((s: RootState) => s.session.downloading)
  const autoScan = useSelector((s: RootState) => s.session.autoScan)

  const [dragOver, setDragOver] = useState(false)
  const [scanning, setScanning] = useState(false)
  const taskIdRef = useRef<Map<string, string>>(new Map())
  const tasksRef = useRef(tasks)
  tasksRef.current = tasks
  const lastProgress = useRef<Map<string, number>>(new Map())
  const PROGRESS_THROTTLE = 200

  useEffect(() => {
    const unsub = window.api.onDownloadProgress((data) => {
      const { taskId, speed, chunkIndex, loaded, ...rest } = data
      const now = Date.now()
      const last = lastProgress.current.get(taskId) || 0
      if (rest.phase !== 'complete' && rest.phase !== 'error' && rest.phase !== 'starting') {
        if (now - last < PROGRESS_THROTTLE) return
        lastProgress.current.set(taskId, now)
      }
      if (chunkIndex !== undefined && loaded !== undefined && rest.total) {
        const t2 = tasksRef.current.find((t) => t.id === taskId)
        if (t2 && t2.downloaded < rest.total) {
          dispatch(updateProgress({ taskId, phase: 'downloading', downloaded: Math.min(t2.downloaded + loaded, rest.total), total: rest.total, speed: speed ?? 0 }))
          return
        }
      }
      dispatch(updateProgress({ taskId, ...rest, speed: speed ?? undefined }))
      if (rest.phase === 'complete') toast.success(t('task.downloadComplete'), rest.filename as string)
      else if (rest.phase === 'error') toast.error(t('task.downloadFailed'), rest.error as string)
    })
    return unsub
  }, [dispatch, toast])

  useEffect(() => {
    if (autoScan && urlsText.trim() && savePath) {
      dispatch(setAutoScan(false))
      handleScan()
    }
  }, [autoScan])

  const handleScan = async () => {
    let url = urlsText.trim().split('\n')[0].trim()
    if (!url.startsWith('http') && !BILI_PATTERN.test(url)) return

    // direct HTTP URLs → batch download all lines
    if (!BILI_PATTERN.test(url) && !YT_PATTERN.test(url)) {
      handleBatchDownload()
      return
    }

    if (/^BV[a-zA-Z0-9]{10}$/.test(url)) url = `https://www.bilibili.com/video/${url}`
    else if (/^av\d+$/i.test(url)) url = `https://www.bilibili.com/video/${url}`
    setScanning(true)
    try {
    dispatch(setVideoInfo(null))
    dispatch(setScannedAssets([]))

    if (BILI_PATTERN.test(url)) {
      dispatch(setIsBili(true))
      const result: any = await window.api.bilibiliInfo(url)
      if (result.error && (!result.parts || result.parts.length === 0) && !result.episodes) { toast.error(t('download.fetchFailed'), result.error); return }
      if (result.isCollection) {
        dispatch(setVideoInfo({
          title: result.collectionTitle || '', cover: '', uploader: '', duration: 0,
          parts: [], isCollection: true,
          collectionTitle: result.collectionTitle,
          collectionUrl: result.collectionUrl,
          episodes: (result.episodes || []).map((e: any, i: number) => ({
            id: e.id || `ep-${i}`,
            title: e.title || `P${i + 1}`,
            url: e.url || '',
            duration: e.duration || 0,
            thumbnail: e.thumbnail || '',
            selected: true
          }))
        }))
        return
      }
      if (result.title) {
        const parts: VideoPart[] = []
        for (const p of (Array.isArray(result.parts) ? result.parts : [])) {
          const formats: VideoFormat[] = []
          if (Array.isArray(p.formats)) for (const f of p.formats) formats.push(f)
          parts.push({ title: p.title || result.title, cid: p.cid, duration: p.duration, formats })
        }
        if (parts.length > 0 && parts[0].formats.length > 0) {
          const vf = parts[0].formats.filter((f: VideoFormat) => f.hasVideo)
          if (vf.length > 0) {
            const best = vf.reduce((a, b) => {
              const ha = parseInt(a.resolution?.split('x')[1] || '0')
              const hb = parseInt(b.resolution?.split('x')[1] || '0')
              return hb > ha ? b : a
            })
            dispatch(setSelectedQuality(best.id || best.url))
          }
        }
        dispatch(setSelectedPartIdx(0))
        dispatch(setVideoInfo({ title: result.title, cover: result.cover, uploader: result.uploader, duration: result.duration, parts, bestAudioId: result.bestAudioId, isCollection: false }))
      }
      return
    }

    if (YT_PATTERN.test(url)) {
      dispatch(setIsBili(false))
      const result: any = await window.api.extractVideo(url)
      if (result.error) { toast.error(t('download.extractFailed'), result.error); return }
      if (result.title) {
        const parts: VideoPart[] = [{ title: result.title, cid: 0, duration: result.duration || 0, formats: result.formats || [] }]
        if (parts[0].formats.length > 0) dispatch(setSelectedQuality(parts[0].formats[0].url))
        dispatch(setVideoInfo({ title: result.title, cover: result.thumbnail, uploader: result.uploader, duration: result.duration || 0, parts, bestAudioId: '' }))
      }
      return
    }

    const result = await window.api.scanUrl(url)
    if (result.error) { toast.error(t('download.scanFailed'), result.error); return }
    dispatch(setScannedAssets(result.assets.map((a: any) => ({ ...a, selected: true }))))
    } finally { setScanning(false) }
  }

  const handleBiliDownload = async () => {
    if (!videoInfo || !selectedQuality || !savePath) return
    dispatch(setDownloading(true))
    try {
    const pname = projects.find((p) => p.id === activeProject)?.name || t('settings.default')
    const outputDir = `${savePath}/${pname}`
    const url = urlsText.trim().split('\n')[0].trim()
    const baseName = sanitizeFilename(videoInfo.title || 'video', 80)
    const result = await window.api.bilibiliDownload(url, selectedQuality, videoInfo.bestAudioId || '', outputDir, baseName)
    if (result.success) { toast.success(t('task.downloadComplete'), result.filename || '') }
    else toast.error(t('task.downloadFailed'), result.error || '')
    } finally { dispatch(setDownloading(false)) }
  }

  const handleBatchDownload = useCallback(async () => {
    const existingUrls = new Set(tasksRef.current.filter((t) => t.status === 'pending' || t.status === 'starting' || t.status === 'downloading' || t.status === 'assembling').map((t) => t.url))
    const lines = urlsText.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('http') && !existingUrls.has(l))
    if (!lines.length || !savePath) return
    const pname = projects.find((p) => p.id === activeProject)?.name || t('settings.default')
    const localTasks = lines.map((url, i) => ({ id: `local-${Date.now()}-${i}`, url, filename: url.split('/').pop()?.split('?')[0] || 'download', project: pname }))
    dispatch(addBatchTasks(localTasks))
    try {
      const results = await window.api.download(lines, savePath, pname)
      results.forEach((r, i) => taskIdRef.current.set(r.taskId, localTasks[i].id))
      if (results.length < lines.length) toast.error(t('download.partial'), `${results.length}/${lines.length}`)
    } catch (err) {
      toast.error(t('download.batchFailed'), err instanceof Error ? err.message : String(err))
    }
  }, [urlsText, savePath, activeProject, projects, dispatch, toast])

  const handleRetry = useCallback(async (task: DownloadTask) => {
    if (!savePath) return; dispatch(retryTask(task.id))
    try { const [r] = await window.api.download([task.url], savePath, task.project); if (r) taskIdRef.current.set(r.taskId, task.id) } catch (err) { console.error(err) }
  }, [savePath, dispatch])

  const handleCollectionDownload = async () => {
    const episodes = videoInfo?.episodes
    if (!episodes || !savePath) return
    const sel = episodes.filter((e) => e.selected)
    if (!sel.length) return
    const pname = projects.find((p) => p.id === activeProject)?.name || t('settings.default')
    const outputDir = `${savePath}/${pname}`
    dispatch(setDownloading(true))
    try {
    for (const ep of sel) {
      const baseName = sanitizeFilename(ep.title || 'episode', 80)
      const result = await window.api.bilibiliDownload(ep.url, 'bestvideo+bestaudio/best', '', outputDir, baseName)
      if (result.success) toast.success(t('task.downloadComplete'), result.filename || '')
      else toast.error(t('task.downloadFailed'), result.error || '')
    }
    } finally { dispatch(setDownloading(false)) }
  }

  const videoFormats = videoInfo?.parts[selectedPartIdx]?.formats.filter((f: VideoFormat) => f.hasVideo) || []
  const audioFormats = videoInfo?.parts[selectedPartIdx]?.formats.filter((f: VideoFormat) => f.type === 'audio' || f.hasAudio) || []
  const allFmts = [...videoFormats, ...audioFormats]
  const selectedFmt = allFmts.find((f) => f.url === selectedQuality)
  const hasMultiParts = (videoInfo?.parts.length || 0) > 1

  const inProgress = tasks.filter((t) => t.status === 'pending' || t.status === 'starting' || t.status === 'downloading' || t.status === 'assembling')
  const hasDone = tasks.some((t) => t.status === 'complete' || t.status === 'error' || t.status === 'cancelled')

  const selectedCount = scannedAssets.filter((a) => a.selected).length
  const collectionSelected = videoInfo?.episodes?.filter((e) => e.selected).length || 0

  return (
    <div className="flex flex-col h-full">
      {toast.contextHolder}
      <div className="p-4 space-y-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="flex items-center gap-2">
          <Select value={activeProject} onChange={(v) => dispatch(setActiveProject(v))} size="middle" className="w-36"
            options={projects.map((p) => ({ value: p.id, label: p.name }))} />
          <div className="flex-1" />
          {!savePath && <span style={{ color: 'var(--color-warning)' }} className="text-xs">{t('download.noSavePath')}</span>}
        </div>
        <div className="flex gap-2">
          <textarea
            className="flex-1 h-16 px-3 py-2 text-sm border rounded-cv-sm resize-none transition-all duration-200 disabled:opacity-50"
            style={{ background: 'var(--color-surface)', borderColor: dragOver ? 'var(--color-primary)' : 'var(--color-border)', color: 'var(--color-fg)' }}
            placeholder={t('download.placeholder')}
            value={urlsText} onChange={(e) => dispatch(setUrlsText(e.target.value))} disabled={!savePath}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); if (!scanning && urlsText.trim()) handleScan() } }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-light)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => { e.preventDefault(); setDragOver(false); const t = e.dataTransfer.getData('text/plain'); if (t) dispatch(setUrlsText(urlsText ? urlsText + '\n' + t : t)) }} />
          <div className="flex flex-col gap-2 justify-center">
            <Button onClick={handleScan} disabled={!savePath || scanning || !urlsText.trim()}>
              <SearchOutlined /> {scanning ? '...' : t('download.scan')}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto" style={{ background: 'var(--color-bg)' }}>
        {videoInfo && !videoInfo.isCollection && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex gap-4 max-w-2xl">
              {videoInfo.cover && (
                <img src={videoInfo.cover} alt="" className="w-40 h-24 object-cover rounded-cv shrink-0" style={{ background: 'var(--color-border)' }} />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold leading-snug line-clamp-2">{videoInfo.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs" style={{ color: 'var(--color-muted)' }}>
                  {videoInfo.uploader && <span>{videoInfo.uploader}</span>}
                  {videoInfo.duration > 0 && <span>{Math.floor(videoInfo.duration / 60)}:{String(Math.floor(videoInfo.duration % 60)).padStart(2, '0')}</span>}
                  <Tag>{isBili ? t('download.bilibili') : t('download.youtube')}</Tag>
                </div>
                {hasMultiParts && (
                  <div className="mt-2">
                    <Select size="small" value={selectedPartIdx} onChange={(v) => { dispatch(setSelectedPartIdx(v)); const p = videoInfo.parts[v]; if (p) { const vf = p.formats.filter((f) => f.type === 'video'); if (vf.length > 0) dispatch(setSelectedQuality(vf[0].url)) } }}
                      className="w-full"
                      options={videoInfo.parts.map((p, i) => ({ value: i, label: `P${i + 1}: ${p.title}` }))} />
                  </div>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Select size="small" value={selectedQuality} onChange={(v) => dispatch(setSelectedQuality(v))} className="flex-1"
                    options={[
                      ...videoFormats.map((f) => ({ value: f.id || f.url, label: `🎬 ${f.format}` })),
                      ...audioFormats.map((f) => ({ value: f.id || f.url, label: `🎵 ${f.format}` }))
                    ]} />
                  <Button onClick={handleBiliDownload} disabled={downloading || !selectedQuality}>
                    <DownloadOutlined /> {downloading ? t('download.downloading') : t('download.downloadBtn')}
                  </Button>
                </div>
                {selectedFmt && (
                  <p className="text-[10px] mt-1" style={{ color: 'var(--color-muted)' }}>
                    {selectedFmt.format} · {selectedFmt.name}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {videoInfo?.isCollection && videoInfo.episodes && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="p-4 space-y-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold truncate">{videoInfo.collectionTitle || t('nav.download')}</h3>
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{videoInfo.episodes.length} 集</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs" style={{ color: 'var(--color-muted)' }}>已选 {collectionSelected} / {videoInfo.episodes.length} 集</span>
              <Button variant="ghost" size="sm" onClick={() => {
                const allSel = videoInfo.episodes?.every((e) => e.selected)
                dispatch(selectAllEpisodes(!allSel))
              }}>{t('download.selectAll')}</Button>
            </div>
            <div className="grid gap-1.5 max-h-64 overflow-auto" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
              {videoInfo.episodes.map((ep, i) => (
                <div key={ep.id || i} onClick={() => dispatch(toggleEpisode(i))} className="flex items-center gap-2 px-2.5 py-1.5 rounded-cv-sm cursor-pointer text-xs"
                  style={{ background: ep.selected ? 'var(--color-primary-light)' : 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={ep.selected} onChange={() => dispatch(toggleEpisode(i))} className="accent-[var(--color-primary)] shrink-0" />
                  <span className="truncate flex-1 font-medium">{ep.title}</span>
                  {ep.duration > 0 && <span style={{ color: 'var(--color-muted)' }} className="shrink-0">{Math.floor(ep.duration / 60)}:{(String(Math.floor(ep.duration % 60)).padStart(2, '0'))}</span>}
                </div>
              ))}
            </div>
            <div className="text-right">
              <Button size="sm" onClick={handleCollectionDownload} disabled={downloading || collectionSelected === 0}>
                <DownloadOutlined /> {downloading ? t('download.downloading') : t('download.selected', { count: collectionSelected })}
              </Button>
            </div>
          </motion.div>
        )}

        {scannedAssets.length > 0 && (
          <div className="p-4 space-y-2" style={{ borderBottom: '1px solid var(--color-border)' }}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{t('download.scanned', { count: scannedAssets.length })}</span>
              <Button variant="ghost" size="sm" onClick={() => {
                const allSel = scannedAssets.every((a) => a.selected)
                dispatch(setScannedAssets(scannedAssets.map((a) => ({ ...a, selected: !allSel }))))
              }}>{t('download.selectAll')}</Button>
            </div>
            <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {scannedAssets.map((a, i) => (
                <div key={i} onClick={() => dispatch(toggleScannedAsset(i))} className="flex items-center gap-2 px-2.5 py-1.5 rounded-cv-sm cursor-pointer text-xs"
                  style={{ background: a.selected ? 'var(--color-primary-light)' : 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={a.selected} onChange={() => dispatch(toggleScannedAsset(i))} className="accent-[var(--color-primary)]" />
                  <span className="truncate flex-1">{a.name}</span>
                  <Tag>{a.type}</Tag>
                </div>
              ))}
            </div>
            <div className="text-right">
              <Button size="sm" onClick={async () => {
                const sel = scannedAssets.filter((a) => a.selected)
                if (!sel.length || !savePath) return
                const existingUrls = new Set(tasksRef.current.filter((t) => t.status === 'pending' || t.status === 'starting' || t.status === 'downloading' || t.status === 'assembling').map((t) => t.url))
                const filtered = sel.filter((a) => !existingUrls.has(a.url))
                if (!filtered.length) return
                const pname = projects.find((p) => p.id === activeProject)?.name || t('settings.default')
                const localTasks = filtered.map((a, i) => ({ id: `scan-${Date.now()}-${i}`, url: a.url, filename: a.name, project: pname }))
                dispatch(addBatchTasks(localTasks))
                try { const results = await window.api.download(filtered.map((a) => a.url), savePath, pname); results.forEach((r, ii) => taskIdRef.current.set(r.taskId, localTasks[ii].id)) } catch (err) { toast.error(t('download.batchFailed'), err instanceof Error ? err.message : String(err)) }
              }} disabled={selectedCount === 0}>
                <DownloadOutlined /> {t('download.selected', { count: selectedCount })}
              </Button>
            </div>
          </div>
        )}

        {tasks.length === 0 && !videoInfo && scannedAssets.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 gap-3" style={{ color: 'var(--color-muted)' }}>
            <DownloadOutlined className="text-5xl opacity-15" />
            <p className="text-sm">{t('download.empty')}</p>
            <p className="text-xs opacity-60">{t('download.emptyHint')}</p>
          </div>
        ) : tasks.length > 0 ? (
          <>
            {hasDone && (
              <div className="px-4 py-2 flex justify-between items-center" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
                <span className="text-xs" style={{ color: 'var(--color-muted)' }}>{inProgress.length > 0 ? t('download.inProgress', { count: inProgress.length }) : t('download.idle')}</span>
                <Button variant="text" size="sm" onClick={() => dispatch(clearCompleted())}><ClearOutlined /> {t('download.clearDone')}</Button>
              </div>
            )}
            <AnimatePresence initial={false}>
              {tasks.map((task) => (
                <TaskItem key={task.id} task={task}
                  onCancel={() => { window.api.cancelDownload(task.id); dispatch(cancelTask(task.id)) }}
                  onRemove={() => dispatch(removeTask(task.id))}
                  onRetry={() => handleRetry(task)} />
              ))}
            </AnimatePresence>
          </>
        ) : null}
      </div>

      <div className="px-4 py-2 text-xs flex justify-between" style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-muted)', background: 'var(--color-surface)' }}>
        <span>{t('download.tasks', { count: tasks.length })}</span>
        <span className="truncate ml-4">{savePath ? t('download.saveTo', { path: savePath }) : t('download.noPath')}</span>
      </div>
    </div>
  )
}

