import { Select, Modal, Segmented, Popconfirm, Input } from 'antd'
import { FolderOpenOutlined, FileOutlined, SoundOutlined, EyeOutlined, PlayCircleOutlined, CaretUpOutlined, CaretDownOutlined, PictureOutlined, VideoCameraOutlined, AudioOutlined, FileTextOutlined, AppstoreOutlined, UnorderedListOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SettingOutlined } from '@ant-design/icons'
import { useEffect, useState, useRef, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '@renderer/store'
import { setActiveProject, addProject, renameProject, removeProject } from '@renderer/store/config'
import { formatBytes, formatDuration } from '@renderer/utils/format'
import { EmptyState, Spinner } from '@renderer/components/ui/Card'
import { Button } from '@renderer/components/ui/Button'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface MediaInfo { size: number; ext: string; codec?: string; width?: number; height?: number; duration?: number }
interface AssetEntry { name: string; path: string; size: number; ext: string; mtime: number; thumbPath?: string }

const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.ico']
const videoExts = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv', '.m4v']
const audioExts = ['.mp3', '.wav', '.aac', '.flac', '.ogg', '.wma', '.m4a']
const docExts = ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt', '.md']
const fontExts = ['.ttf', '.otf', '.woff', '.woff2']

type CatKey = 'all' | 'image' | 'video' | 'audio' | 'document' | 'other'
type ViewMode = 'grid' | 'compact' | 'detail'
type SortKey = 'name' | 'size' | 'mtime'

const CATS: (t: (k: string) => string) => { key: CatKey; label: string; icon: React.ReactNode; exts: string[] }[] = (t) => [
  { key: 'all', label: t('assets.categories.all'), icon: <AppstoreOutlined />, exts: [] },
  { key: 'image', label: t('library.types.image'), icon: <PictureOutlined />, exts: imageExts },
  { key: 'video', label: t('assets.categories.video'), icon: <VideoCameraOutlined />, exts: videoExts },
  { key: 'audio', label: t('library.types.audio'), icon: <AudioOutlined />, exts: audioExts },
  { key: 'document', label: t('assets.categories.document'), icon: <FileTextOutlined />, exts: [...docExts, ...fontExts] },
  { key: 'other', label: t('assets.categories.other'), icon: <FileOutlined />, exts: [] },
]

function catFor(ext: string): CatKey {
  const e = ext.toLowerCase()
  if (imageExts.includes(e)) return 'image'
  if (videoExts.includes(e)) return 'video'
  if (audioExts.includes(e)) return 'audio'
  if (docExts.includes(e) || fontExts.includes(e)) return 'document'
  return 'other'
}

export default function AssetBrowser() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const savePath = useSelector((s: RootState) => s.config.savePath)
  const projects = useSelector((s: RootState) => s.config.projects) || []
  const activeProject = useSelector((s: RootState) => s.config.activeProject) || 'default'
  const [allAssets, setAllAssets] = useState<AssetEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(0)
  const [previewAsset, setPreviewAsset] = useState<AssetEntry | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileInfo, setFileInfo] = useState<MediaInfo | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('mtime')
  const [sortAsc, setSortAsc] = useState(false)
  const [cat, setCat] = useState<CatKey>('all')
  const [assetMeta, setAssetMeta] = useState<any>(null)
  const [previewPoster, setPreviewPoster] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [playingAsset, setPlayingAsset] = useState<AssetEntry | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const PAGE_SIZE = 30

  // project management
  const [showAddProject, setShowAddProject] = useState(false)
  const [newProjectName, setNewProjectName] = useState('')
  const [editingProject, setEditingProject] = useState<any>(null)
  const [editName, setEditName] = useState('')
  const [showManageProjects, setShowManageProjects] = useState(false)

  const handleAddProject = () => {
    const name = newProjectName.trim()
    if (!name) return
    dispatch(addProject({ id: `p-${Date.now()}`, name, createdAt: Date.now() }))
    setNewProjectName(''); setShowAddProject(false)
  }

  const handleRenameProject = () => {
    if (!editingProject || !editName.trim()) return
    dispatch(renameProject({ id: editingProject.id, name: editName.trim() }))
    setEditingProject(null); setEditName('')
  }

  const scan = async (dirPath: string) => {
    setLoading(true); setPage(0)
    try { setAllAssets((await window.api.scanDirectory(dirPath)).files || []) } catch { setAllAssets([]) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    if (!savePath) return
    const project = projects.find((p) => p.id === activeProject)
    scan(project ? `${savePath}/${project.name}` : savePath)
  }, [savePath, activeProject, projects])

  const filtered = useMemo(
    () => cat === 'all' ? allAssets : allAssets.filter((a) => catFor(a.ext) === cat),
    [allAssets, cat]
  )
  const sorted = useMemo(() => [...filtered].sort((a, b) => {
    let cmp = 0
    if (sortKey === 'name') cmp = a.name.localeCompare(b.name)
    else if (sortKey === 'size') cmp = a.size - b.size
    else cmp = a.mtime - b.mtime
    return sortAsc ? cmp : -cmp
  }), [filtered, sortKey, sortAsc])
  const visible = useMemo(() => sorted.slice(0, (page + 1) * PAGE_SIZE), [sorted, page])

  const openPreview = async (asset: AssetEntry) => {
    setPreviewAsset(asset)
    setPreviewPoster(null)
    if (imageExts.includes(asset.ext.toLowerCase())) {
      const r = await window.api.readLocalFile(asset.path)
      if (r.data) setPreviewUrl(`data:${r.mime};base64,${r.data}`)
    } else setPreviewUrl(null)
    if (videoExts.includes(asset.ext.toLowerCase())) {
      if (asset.thumbPath) {
        window.api.readLocalFile(asset.thumbPath).then((r) => { if (r.data) setPreviewPoster(`data:${r.mime};base64,${r.data}`) })
      } else {
        window.api.extractVideoFrame(asset.path).then((r) => { if (r) setPreviewPoster(r) })
      }
    }
    try { setFileInfo(await window.api.getFileInfo(asset.path)) } catch { setFileInfo({ size: asset.size, ext: asset.ext }) }
    window.api.getAssetMeta(asset.path).then(setAssetMeta)
  }

  const play = async (asset: AssetEntry) => {
    if (audioRef.current) {
      const old = audioRef.current
      old.pause(); old.onended = null; old.onerror = null; old.src = ''
    }
    const r = await window.api.readLocalFile(asset.path)
    if (!r.data || r.data.length < 1000) return
    setPlayingAsset(asset)
    const bytes = Uint8Array.from(atob(r.data), (c) => c.charCodeAt(0))
    const blob = new Blob([bytes], { type: r.mime || 'audio/mpeg' })
    const url = URL.createObjectURL(blob)
    const a = new Audio(url)
    const cleanup = () => { setPlayingAsset(null); URL.revokeObjectURL(url); audioRef.current = null }
    audioRef.current = a
    a.onended = cleanup
    a.onerror = cleanup
    try { await a.play() } catch { cleanup() }
  }

  const counts = useMemo(() => {
    const c = { all: allAssets.length, image: 0, video: 0, audio: 0, document: 0, other: 0 }
    for (const a of allAssets) { const k = catFor(a.ext); if (k in c) (c as any)[k]++ }
    return c
  }, [allAssets])

  if (!savePath) return <div className="flex items-center justify-center h-full"><EmptyState icon={<FolderOpenOutlined className="text-5xl" />} title={t('assets.noPath')} /></div>

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 space-y-3" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Select value={activeProject} onChange={(v) => dispatch(setActiveProject(v))} size="small" className="w-32"
              options={projects.map((p) => ({ value: p.id, label: p.name }))} />
            <button onClick={() => setShowAddProject(true)}
              className="w-6 h-6 flex items-center justify-center rounded text-xs bg-transparent border-0 cursor-pointer transition-colors hover:bg-[var(--color-primary-light)]"
              style={{ color: 'var(--color-muted)' }} title={t('settings.newCategory')}>
              <PlusOutlined />
            </button>
            <button onClick={() => setShowManageProjects(!showManageProjects)}
              className="w-6 h-6 flex items-center justify-center rounded text-xs bg-transparent border-0 cursor-pointer transition-colors hover:bg-[var(--color-primary-light)]"
              style={{ color: showManageProjects ? 'var(--color-primary)' : 'var(--color-muted)' }} title={t('settings.categories')}>
              <SettingOutlined />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Segmented size="small" value={viewMode} onChange={(v) => setViewMode(v as ViewMode)}
              options={[
                { value: 'grid', icon: <AppstoreOutlined /> },
                { value: 'compact', icon: <UnorderedListOutlined /> },
                { value: 'detail', icon: <FileTextOutlined /> },
              ]} />
            <button onClick={() => { const p = projects.find((p) => p.id === activeProject); scan(p ? `${savePath}/${p.name}` : savePath) }}
              className="text-xs font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-primary)' }}>{t('assets.refresh')}</button>
          </div>
        </div>

        {showManageProjects && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="cv-card p-3 space-y-1">
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--color-muted)' }}>{t('settings.categories')}</p>
              <AnimatePresence>
                {projects.map((p) => (
                  <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center justify-between px-2.5 py-1.5 rounded-cv-sm text-xs"
                    style={{ border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2">
                      <FolderOpenOutlined style={{ color: 'var(--color-muted)', fontSize: 12 }} />
                      <span>{p.name}</span>
                      {p.id === 'default' && <span style={{ fontSize: '10px', color: 'var(--color-muted)' }}>{t('settings.default')}</span>}
                    </div>
                    {p.id !== 'default' && (
                      <div className="flex gap-0.5">
                        <button onClick={() => { setEditingProject(p); setEditName(p.name) }}
                          className="w-5 h-5 flex items-center justify-center bg-transparent border-0 cursor-pointer rounded hover:bg-[var(--color-primary-light)]"
                          style={{ color: 'var(--color-muted)' }}><EditOutlined style={{ fontSize: 11 }} /></button>
                        <Popconfirm title={t('settings.deleteCategory')} description={t('settings.deleteCategoryHint')} onConfirm={() => dispatch(removeProject(p.id))}
                          okText={t('settings.confirmDelete')} cancelText={t('settings.cancel')}>
                          <button className="w-5 h-5 flex items-center justify-center bg-transparent border-0 cursor-pointer rounded hover:bg-[var(--color-primary-light)]"
                            style={{ color: 'var(--color-danger)' }}><DeleteOutlined style={{ fontSize: 11 }} /></button>
                        </Popconfirm>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        <div className="flex items-center gap-1.5 flex-wrap">
          {CATS(t).map((c) => (
            <button key={c.key} onClick={() => { setCat(c.key); setPage(0) }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-cv-sm text-xs font-medium transition-colors bg-transparent border-0 cursor-pointer"
              style={{ background: cat === c.key ? 'var(--color-primary-light)' : 'transparent', color: cat === c.key ? 'var(--color-primary)' : 'var(--color-muted)' }}>
              {c.icon} {c.label} <span style={{ opacity: 0.6 }}>{counts[c.key]}</span>
            </button>
          ))}
          <div className="flex-1" />
          <div className="flex items-center gap-0.5 text-[10px]" style={{ color: 'var(--color-muted)' }}>
            {(['name', 'size', 'mtime'] as SortKey[]).map((k) => (
              <button key={k} onClick={() => { if (sortKey === k) setSortAsc(!sortAsc); else { setSortKey(k); setSortAsc(false) }; setPage(0) }}
                className="px-2 py-0.5 rounded-cv-sm bg-transparent border-0 cursor-pointer"
                style={{ color: sortKey === k ? 'var(--color-primary)' : 'var(--color-muted)', background: sortKey === k ? 'var(--color-primary-light)' : 'transparent' }}>
                {k === 'name' ? t('assets.sortName') : k === 'size' ? t('assets.sortSize') : t('assets.sortDate')} {sortKey === k && (sortAsc ? <CaretUpOutlined /> : <CaretDownOutlined />)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? <div className="flex items-center justify-center h-full"><Spinner size={32} /></div>
        : allAssets.length === 0 ? (
          <EmptyState icon={<FolderOpenOutlined className="text-5xl" />} title={t('assets.emptyTitle')} hint={t('assets.emptyHint')} />
        ) : filtered.length === 0 ? (
          <EmptyState icon={<FileOutlined className="text-5xl" />} title={t('assets.emptyTitle')} />
        ) : viewMode === 'detail' ? (
          <div className="space-y-1">
            {visible.map((a) => (
              <div key={a.path} className="flex items-center gap-3 px-3 py-2 rounded-cv-sm cursor-pointer hover:opacity-80"
                style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}
                onClick={() => openPreview(a)}>
                <span className="text-sm shrink-0" style={{ color: 'var(--color-muted)' }}>{getIcon(a.ext)}</span>
                <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{a.name}</p></div>
                <span className="text-[10px] w-16 text-right" style={{ color: 'var(--color-muted)' }}>{formatBytes(a.size)}</span>
                <span className="text-[10px] w-20 text-right" style={{ color: 'var(--color-muted)' }}>{fmtDate(a.mtime, i18n.language)}</span>
                <button onClick={(e) => { e.stopPropagation(); window.api.openItemInFolder(a.path) }}
                  className="text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-accent)' }}>{t('assets.open')}</button>
                <button onClick={async (e) => { e.stopPropagation(); const { Modal } = await import('antd'); Modal.confirm({ title: t('assets.deleteConfirm', { name: a.name }), okText: t('settings.confirmDelete'), cancelText: t('settings.cancel'), okButtonProps: { danger: true }, onOk: async () => { const r = await window.api.deleteFile(a.path); if (r.success) setAllAssets((p) => p.filter((x) => x.path !== a.path)) } }) }}
                  className="text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-danger)' }}>{t('assets.delete')}</button>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className={viewMode === 'compact' ? 'space-y-1' : 'grid gap-3'} style={viewMode === 'compact' ? {} : { gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
              {visible.map((a) => viewMode === 'compact' ? (
                <CompactRow key={a.path} asset={a} onPreview={openPreview} onPlay={play} onOpen={() => window.api.openItemInFolder(a.path)}
                  onDelete={async () => { const { Modal } = await import('antd'); Modal.confirm({ title: t('assets.deleteConfirm', { name: a.name }), okText: t('settings.confirmDelete'), cancelText: t('settings.cancel'), okButtonProps: { danger: true }, onOk: async () => { const r = await window.api.deleteFile(a.path); if (r.success) setAllAssets((p) => p.filter((x) => x.path !== a.path)) } }) }} />
              ) : (
                <GridCard key={a.path} asset={a} onPreview={openPreview} onPlay={play} onOpen={() => window.api.openItemInFolder(a.path)}
                  onDelete={async () => { const { Modal } = await import('antd'); Modal.confirm({ title: t('assets.deleteConfirm', { name: a.name }), okText: t('settings.confirmDelete'), cancelText: t('settings.cancel'), okButtonProps: { danger: true }, onOk: async () => { const r = await window.api.deleteFile(a.path); if (r.success) setAllAssets((p) => p.filter((x) => x.path !== a.path)) } }) }} />
              ))}
            </div>
            {visible.length < sorted.length && (
              <div className="text-center py-6">
                <Button variant="ghost" onClick={() => setPage((p) => p + 1)}>{t('assets.loadMore')} ({visible.length}/{sorted.length})</Button>
              </div>
            )}
          </>
        )}
      </div>

      {playingAsset && (
        <div className="fixed bottom-0 left-[220px] right-0 z-50 px-4 py-2 flex items-center gap-3 shadow-lg"
          style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
          <SoundOutlined style={{ color: 'var(--color-primary)' }} />
          <span className="text-xs flex-1 truncate">{playingAsset.name} - {t('assets.playing')}</span>
          <button onClick={() => { audioRef.current?.pause(); setPlayingAsset(null) }}
            className="text-xs font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-muted)' }}>{t('assets.stop')}</button>
        </div>
      )}

      <Modal open={!!previewAsset} footer={null} onCancel={() => { setPreviewAsset(null); setPreviewUrl(null); setFileInfo(null); setPreviewPoster(null); setAssetMeta(null) }} width="70vw" title={previewAsset?.name} centered>
        {previewAsset && (
          <div className="space-y-3">
            {previewUrl ? <img src={previewUrl} alt={previewAsset.name} className="w-full max-h-[60vh] object-contain rounded-cv" />
             : videoExts.includes(previewAsset.ext.toLowerCase()) ? <VideoPreview path={previewAsset.path} poster={previewPoster} />
             : audioExts.includes(previewAsset.ext.toLowerCase()) ? <AudioPreview path={previewAsset.path} />
             : <FileOutlined className="text-6xl block mx-auto" style={{ color: 'var(--color-muted)' }} />}
            {fileInfo && <InfoGrid info={fileInfo} />}
            {assetMeta && <MetaGrid meta={assetMeta} />}
          </div>
        )}
      </Modal>

      <Modal title={t('settings.newCategory')} open={showAddProject} onOk={handleAddProject} onCancel={() => { setShowAddProject(false); setNewProjectName('') }}
        okText={t('settings.ok')} cancelText={t('settings.cancel')} okButtonProps={{ disabled: !newProjectName.trim() }}>
        <Input value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} onPressEnter={handleAddProject} placeholder={t('settings.newCategory')} />
      </Modal>

      <Modal title={t('settings.rename')} open={!!editingProject} onOk={handleRenameProject} onCancel={() => { setEditingProject(null); setEditName('') }}
        okText={t('settings.ok')} cancelText={t('settings.cancel')}>
        <Input value={editName} onChange={(e) => setEditName(e.target.value)} onPressEnter={handleRenameProject} />
      </Modal>
    </div>
  )
}

function getIcon(ext: string) {
  const e = ext.toLowerCase()
  if (imageExts.includes(e)) return '🖼'
  if (videoExts.includes(e)) return '🎬'
  if (audioExts.includes(e)) return '🎵'
  if (docExts.includes(e)) return '📄'
  return '📁'
}

function fmtDate(ts: number, lang?: string) {
  return new Date(ts).toLocaleDateString(lang || 'zh-CN', { month: '2-digit', day: '2-digit' })
}

const THUMBNAIL_MAX_BYTES = 20 * 1024 * 1024

function GridCard({ asset, onPreview, onPlay, onOpen, onDelete }: { asset: AssetEntry; onPreview: (a: AssetEntry) => void; onPlay: (a: AssetEntry) => void; onOpen: () => void; onDelete: () => void }) {
  const { t } = useTranslation()
  const isImage = imageExts.includes(asset.ext.toLowerCase())
  const isVideo = videoExts.includes(asset.ext.toLowerCase())
  const isAudio = audioExts.includes(asset.ext.toLowerCase())
  const [thumb, setThumb] = useState<string | null>(null)
  useEffect(() => {
    if (isImage) {
      if (asset.size > THUMBNAIL_MAX_BYTES) return
      window.api.readLocalFile(asset.path).then((r) => { if (r.data) setThumb(`data:${r.mime};base64,${r.data}`) })
    } else if (isVideo) {
      if (asset.thumbPath) {
        window.api.readLocalFile(asset.thumbPath).then((r) => { if (r.data) setThumb(`data:${r.mime};base64,${r.data}`) })
      } else {
        window.api.extractVideoFrame(asset.path).then((r) => { if (r) setThumb(r) })
      }
    }
  }, [asset.path, isImage, isVideo, asset.size, asset.thumbPath])

  return (
    <div className="cv-card overflow-hidden group cursor-pointer transition-shadow hover:shadow-gh-md" onClick={() => onPreview(asset)}>
      <div className="relative flex items-center justify-center" style={{ height: 140, background: isVideo ? '#000' : 'var(--color-bg)' }}>
        {thumb ? <img src={thumb} alt={asset.name} className="w-full h-full object-cover" />
          : isImage ? <Spinner size={20} />
          : isVideo ? <PlayCircleOutlined className="text-4xl" style={{ color: 'rgba(255,255,255,0.3)' }} />
          : <span className="text-4xl">{getIcon(asset.ext)}</span>}
        {isVideo && <span className="absolute top-1.5 right-1.5 text-[10px] px-1.5 py-0.5 rounded font-medium" style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}>{asset.ext.slice(1).toUpperCase()}</span>}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <button onClick={(e) => { e.stopPropagation(); onPreview(asset) }} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 border-0 cursor-pointer"><EyeOutlined style={{ color: '#333' }} /></button>
          {isAudio && <button onClick={(e) => { e.stopPropagation(); onPlay(asset) }} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/90 border-0 cursor-pointer"><PlayCircleOutlined style={{ color: '#333' }} /></button>}
        </div>
      </div>
      <div className="p-2">
        <p className="text-xs font-medium truncate">{asset.name}</p>
        <p className="text-[10px] mt-0.5" style={{ color: 'var(--color-muted)' }}>{formatBytes(asset.size)}</p>
      </div>
      <div className="flex border-t opacity-0 group-hover:opacity-100 transition-opacity" style={{ borderColor: 'var(--color-border)' }}>
        <button onClick={(e) => { e.stopPropagation(); onOpen() }} className="flex-1 py-1.5 text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-accent)' }}>{t('assets.open')}</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete() }} className="flex-1 py-1.5 text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer" style={{ color: 'var(--color-danger)' }}>{t('assets.delete')}</button>
      </div>
    </div>
  )
}

function CompactRow({ asset, onPreview, onPlay, onOpen, onDelete }: { asset: AssetEntry; onPreview: (a: AssetEntry) => void; onPlay: (a: AssetEntry) => void; onOpen: () => void; onDelete: () => void }) {
  const { t } = useTranslation()
  const isAudio = audioExts.includes(asset.ext.toLowerCase())
  const isImage = imageExts.includes(asset.ext.toLowerCase())
  const isVideo = videoExts.includes(asset.ext.toLowerCase())
  const [thumb, setThumb] = useState<string | null>(null)
  useEffect(() => {
    if (!isVideo) return
    if (asset.thumbPath) {
      window.api.readLocalFile(asset.thumbPath).then((r) => { if (r.data) setThumb(`data:${r.mime};base64,${r.data}`) })
    } else {
      window.api.extractVideoFrame(asset.path).then(setThumb)
    }
  }, [asset.path, isVideo, asset.thumbPath])
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-cv-sm cursor-pointer hover:opacity-80 group"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }} onClick={() => onPreview(asset)}>
      {thumb ? <img src={thumb} alt="" className="w-10 h-7 object-cover rounded shrink-0" /> : <span className="text-lg shrink-0">{getIcon(asset.ext)}</span>}
      <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{asset.name}</p></div>
      <span className="text-[10px] w-14 text-right" style={{ color: 'var(--color-muted)' }}>{formatBytes(asset.size)}</span>
      {isAudio && (
        <button onClick={(e) => { e.stopPropagation(); onPlay(asset) }}
          className="text-xs font-medium hover:underline bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100" style={{ color: 'var(--color-primary)' }}>{t('assets.play')}</button>
      )}
      {isImage && (
        <button onClick={(e) => { e.stopPropagation(); onPreview(asset) }}
          className="text-xs font-medium hover:underline bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100" style={{ color: 'var(--color-primary)' }}>{t('assets.preview')}</button>
      )}
      <button onClick={(e) => { e.stopPropagation(); onOpen() }}
        className="text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100" style={{ color: 'var(--color-accent)' }}>{t('assets.open')}</button>
      <button onClick={async (e) => { e.stopPropagation(); if (!confirm(t('assets.deleteConfirm', { name: asset.name }))) return; onDelete() }}
        className="text-[10px] font-medium hover:underline bg-transparent border-0 cursor-pointer opacity-0 group-hover:opacity-100" style={{ color: 'var(--color-danger)' }}>{t('assets.delete')}</button>
    </div>
  )
}

function VideoPreview({ path, poster }: { path: string; poster?: string | null }) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(false)
  const [failed, setFailed] = useState(false)

  useEffect(() => { setReady(false); setStarted(false); setFailed(false) }, [path])

  const handlePlay = () => {
    const el = ref.current
    if (!el) return
    setStarted(true)
    el.play().catch(() => setStarted(false))
  }
  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-full rounded-cv overflow-hidden" style={{ background: '#000' }}>
        <video ref={ref} controls className="w-full max-h-[60vh]" preload="auto"
          src={`media://${encodeURI(path)}`} poster={poster || undefined}
          onCanPlay={() => setReady(true)} onLoadedData={() => setReady(true)}
          onError={() => setFailed(true)} />
        {!ready && !failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white/60"><Spinner size={32} /></span>
          </div>
        )}
        {ready && !started && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer transition-colors hover:bg-black/20"
            onClick={handlePlay}>
            <span className="text-white text-6xl drop-shadow-lg"><PlayCircleOutlined /></span>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <span className="text-white/40 text-xs">加载失败</span>
          </div>
        )}
      </div>
    </div>
  )
}

function AudioPreview({ path }: { path: string }) {
  const [src, setSrc] = useState<string | null>(null)
  const mountedRef = useRef(true)
  useEffect(() => {
    mountedRef.current = true
    let url: string | null = null
    window.api.readLocalFile(path).then((r) => {
      if (!mountedRef.current) return
      if (r.data && r.data.length > 1000) { const b = Uint8Array.from(atob(r.data), (c) => c.charCodeAt(0)); const blob = new Blob([b], { type: r.mime || 'audio/mpeg' }); url = URL.createObjectURL(blob); setSrc(url) }
    })
    return () => { mountedRef.current = false; if (url) URL.revokeObjectURL(url) }
  }, [path])
  return <div className="flex flex-col items-center py-8">{src ? <audio controls autoPlay className="w-full" src={src} /> : <Spinner size={24} />}</div>
}

function InfoGrid({ info }: { info: MediaInfo }) {
  const { t } = useTranslation()
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm p-3 rounded-cv" style={{ background: 'var(--color-bg)' }}>
      <span style={{ color: 'var(--color-muted)' }}>{t('assets.info.size')}</span><span>{formatBytes(info.size)}</span>
      <span style={{ color: 'var(--color-muted)' }}>{t('assets.info.format')}</span><span>{info.ext}</span>
      {info.codec && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.info.codec')}</span><span>{info.codec}</span></>}
      {info.width && info.height && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.info.resolution')}</span><span>{info.width}×{info.height}</span></>}
      {info.duration !== undefined && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.info.duration')}</span><span>{formatDuration(info.duration)}</span></>}
    </div>
  )
}

function MetaGrid({ meta }: { meta: any }) {
  const { t, i18n } = useTranslation()
  if (!meta) return null
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm p-3 rounded-cv" style={{ background: 'var(--color-primary-light)' }}>
      <span style={{ color: 'var(--color-muted)' }}>{t('assets.meta.source')}</span><span>{meta.provider || meta.source || '-'}</span>
      {meta.sourceUrl && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.meta.originalUrl')}</span><span className="truncate text-xs">{typeof meta.sourceUrl === 'string' ? meta.sourceUrl.slice(0, 60) : ''}</span></>}
      {meta.title && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.meta.title')}</span><span className="truncate text-xs">{meta.title}</span></>}
      {meta.downloadedAt && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.meta.downloadTime')}</span><span className="text-xs">{new Date(meta.downloadedAt).toLocaleString(i18n.language || 'zh-CN')}</span></>}
      {meta.fileHash && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.meta.hash')}</span><span className="text-xs font-mono">{meta.fileHash}</span></>}
      {meta.fileSize && <><span style={{ color: 'var(--color-muted)' }}>{t('assets.info.size')}</span><span>{formatBytes(meta.fileSize)}</span></>}
    </div>
  )
}
