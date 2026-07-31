import { forwardRef } from 'react'
import { motion } from 'framer-motion'

export const Card = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className = '', children, ...props }, ref) => (
    <div ref={ref} className={`cv-card ${className}`} {...props}>{children}</div>
  )
)
Card.displayName = 'Card'

export const Progress = ({ percent, color }: { percent: number; color?: string }) => (
  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
    <div className="h-full rounded-full transition-all duration-300" style={{
      width: `${Math.min(percent, 100)}%`,
      background: color || 'var(--color-primary)'
    }} />
  </div>
)

export const Tag = ({ children, color }: { children: React.ReactNode; color?: string }) => (
  <span className="inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-cv-sm" style={{
    background: color || 'var(--color-primary-light)',
    color: color || 'var(--color-primary)',
    border: `1px solid ${color || 'var(--color-primary-light)'}`
  }}>{children}</span>
)

export const Spinner = ({ size = 20 }: { size?: number }) => (
  <svg className="animate-spin" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-label="Loading">
    <circle cx="12" cy="12" r="10" stroke="var(--color-border)" strokeWidth="3" />
    <path d="M12 2a10 10 0 019.95 9" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
  </svg>
)

export const EmptyState = ({ icon, title, hint }: { icon: React.ReactNode; title: string; hint?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="flex flex-col items-center justify-center py-20 gap-2"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 0.3, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.05 }}
      style={{ color: 'var(--color-muted)' }}
    >{icon}</motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
      className="text-sm" style={{ color: 'var(--color-muted)' }}
    >{title}</motion.p>
    {hint && (
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 0.3, delay: 0.25 }}
        className="text-xs" style={{ color: 'var(--color-muted)' }}
      >{hint}</motion.p>
    )}
  </motion.div>
)
