import { useSelector, useDispatch } from 'react-redux'
import { DownloadOutlined, CheckCircleOutlined, CloseCircleOutlined, MinusOutlined } from '@ant-design/icons'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { RootState } from '@renderer/store'
import { clearCompleted } from '@renderer/store/download'
import { formatBytes, formatSpeed } from '@renderer/utils/format'

export default function DownloadStatusBar() {
  const { t } = useTranslation()
  const tasks = useSelector((s: RootState) => s.download.tasks) || []
  const dispatch = useDispatch()
  const [expanded, setExpanded] = useState(false)

  const active = tasks.filter((tk) => tk.status === 'pending' || tk.status === 'starting' || tk.status === 'downloading' || tk.status === 'assembling')
  const done = tasks.filter((tk) => tk.status === 'complete')
  const failed = tasks.filter((tk) => tk.status === 'error')

  if (tasks.length === 0) {
    return (
      <div className="flex items-center gap-1.5 px-3 py-1 text-[11px] shrink-0" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)', color: 'var(--color-muted)' }}>
        <DownloadOutlined />
        <span>{t('statusBar.idle')}</span>
      </div>
    )
  }

  const totalSpeed = active.reduce((sum, tk) => sum + (tk.speed || 0), 0)
  const overallProgress = Math.round(tasks.reduce((sum, tk) => sum + (tk.progress || 0), 0) / tasks.length)

  return (
    <div className="shrink-0" style={{ borderTop: '1px solid var(--color-border)' }}>
      <div
        className="flex items-center gap-2 px-3 py-1.5 cursor-pointer select-none transition-colors"
        style={{ background: 'var(--color-surface)', color: 'var(--color-fg)' }}
        onClick={() => setExpanded(!expanded)}
      >
        <DownloadOutlined className="text-xs" style={{ color: active.length > 0 ? 'var(--color-primary)' : 'var(--color-muted)' }} />
        <span className="text-[11px] font-medium">
          {active.length > 0 ? `${active.length} ${t('statusBar.downloading')}` : done.length > 0 ? `${done.length} ${t('statusBar.completed')}` : `${tasks.length} ${t('statusBar.tasks')}`}
        </span>
        {active.length > 0 && totalSpeed > 0 && (
          <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>{formatSpeed(totalSpeed)}/s</span>
        )}
        <div className="flex-1 mx-2 h-1 rounded-full" style={{ background: 'var(--color-border)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'var(--color-primary)', width: `${overallProgress}%` }}
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <span className="text-[10px]" style={{ color: 'var(--color-muted)' }}>
          {done.length}/{tasks.length}
          {failed.length > 0 && <span style={{ color: 'var(--color-danger)', marginLeft: 4 }}>{failed.length} {t('statusBar.failed')}</span>}
        </span>
        <button
          className="bg-transparent border-0 cursor-pointer p-0.5 rounded-cv-sm"
          style={{ color: 'var(--color-muted)' }}
          onClick={(e) => { e.stopPropagation(); dispatch(clearCompleted()) }}
        >
          <MinusOutlined className="text-[10px]" />
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            <div className="max-h-48 overflow-auto px-3 py-1.5 space-y-0.5" style={{ background: 'var(--color-bg)' }}>
              {active.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-[11px]">
                  <DownloadOutlined className="shrink-0" style={{ color: 'var(--color-primary)' }} />
                  <span className="truncate flex-1" title={task.filename}>{task.filename}</span>
                  <span className="shrink-0" style={{ color: 'var(--color-muted)' }}>{task.progress}%</span>
                  {task.speed > 0 && <span className="shrink-0 text-[10px]" style={{ color: 'var(--color-muted)' }}>{formatSpeed(task.speed)}/s</span>}
                  <div className="w-24 h-1 rounded-full shrink-0" style={{ background: 'var(--color-border)' }}>
                    <div className="h-full rounded-full" style={{ background: 'var(--color-primary)', width: `${task.progress}%` }} />
                  </div>
                  <span className="shrink-0 text-[10px]" style={{ color: 'var(--color-muted)' }}>{formatBytes(task.downloaded)} / {task.total > 0 ? formatBytes(task.total) : '?'}</span>
                </div>
              ))}
              {done.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-[11px]" style={{ opacity: 0.7 }}>
                  <CheckCircleOutlined className="shrink-0" style={{ color: 'var(--color-success)' }} />
                  <span className="truncate flex-1" title={task.filename}>{task.filename}</span>
                  <span className="shrink-0" style={{ color: 'var(--color-success)' }}>{t('statusBar.complete')}</span>
                </div>
              ))}
              {failed.map((task) => (
                <div key={task.id} className="flex items-center gap-2 text-[11px]" style={{ opacity: 0.7 }}>
                  <CloseCircleOutlined className="shrink-0" style={{ color: 'var(--color-danger)' }} />
                  <span className="truncate flex-1" title={task.filename}>{task.filename}</span>
                  <span className="shrink-0" style={{ color: 'var(--color-danger)' }}>{t('statusBar.error')}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
