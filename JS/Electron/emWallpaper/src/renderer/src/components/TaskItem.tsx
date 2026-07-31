import { CloseCircleOutlined, DeleteOutlined, RedoOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { DownloadTask } from '@renderer/store/download'
import { formatBytes, formatSpeed } from '@renderer/utils/format'
import { Progress, Tag } from '@renderer/components/ui/Card'
import { Button } from '@renderer/components/ui/Button'

const statusColor: Record<string, string> = {
  pending: 'var(--color-muted)',
  starting: 'var(--color-warning)',
  downloading: 'var(--color-primary)',
  assembling: 'var(--color-primary)',
  complete: 'var(--color-success)',
  error: 'var(--color-danger)',
  cancelled: 'var(--color-warning)'
}

interface TaskItemProps { task: DownloadTask; onCancel: () => void; onRemove: () => void; onRetry: () => void }

export default function TaskItem({ task, onCancel, onRemove, onRetry }: TaskItemProps) {
  const { t } = useTranslation()
  const isActive = task.status === 'pending' || task.status === 'starting' || task.status === 'downloading' || task.status === 'assembling'

  const statusLabel: Record<string, string> = {
    pending: t('task.pending'), starting: t('task.starting'), downloading: t('task.downloading'),
    assembling: t('task.assembling'), complete: t('task.complete'), error: t('task.error'), cancelled: t('task.cancelled')
  }

  return (
    <motion.div layout initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }} className="px-4 py-3" style={{ borderBottom: '1px solid var(--color-border)' }}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium truncate" title={task.filename}>{task.filename}</p>
            <Tag color={statusColor[task.status]}>{statusLabel[task.status]}</Tag>
          </div>
          <p className="text-xs truncate mt-0.5" style={{ color: 'var(--color-muted)' }} title={task.url}>
            {task.project && <span style={{ color: 'var(--color-primary)' }} className="mr-1">[{task.project}]</span>}{task.url}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {(task.status === 'error' || task.status === 'cancelled') && (
            <Button variant="ghost" size="sm" onClick={onRetry} title={t('task.retry')}><RedoOutlined /></Button>
          )}
          {isActive && (
            <Button variant="danger" size="sm" onClick={onCancel} title={t('task.cancel')}><CloseCircleOutlined /></Button>
          )}
          {!isActive && task.status !== 'error' && task.status !== 'cancelled' && (
            <Button variant="text" size="sm" onClick={onRemove} title={t('task.delete')}><DeleteOutlined /></Button>
          )}
        </div>
      </div>
      {(isActive || task.status === 'assembling') && (
        <div className="mt-2 space-y-1">
          <Progress percent={task.status === 'assembling' ? 100 : task.progress} />
          <div className="flex justify-between text-xs mt-0.5" style={{ color: 'var(--color-muted)' }}>
            <span>{formatBytes(task.downloaded)} / {formatBytes(task.total)}</span>
            {task.speed > 0 && <span>{formatSpeed(task.speed)}</span>}
          </div>
        </div>
      )}
      {task.status === 'complete' && <div className="mt-1"><Progress percent={100} color="var(--color-success)" /></div>}
      {task.status === 'complete' && task.filePath && (
        <p className="text-xs mt-1 truncate" style={{ color: 'var(--color-success)' }} title={task.filePath}>{t('task.saved', { path: task.filePath })}</p>
      )}
      {task.status === 'error' && task.error && <p className="text-xs mt-1" style={{ color: 'var(--color-danger)' }}>{task.error}</p>}
    </motion.div>
  )
}
