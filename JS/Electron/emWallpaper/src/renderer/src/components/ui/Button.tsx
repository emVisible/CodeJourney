import { forwardRef, useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'ghost' | 'text'
  size?: 'sm' | 'md'
}

const base = 'inline-flex items-center justify-center gap-1.5 font-medium rounded-cv-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-1 disabled:opacity-40 disabled:cursor-not-allowed select-none'

const sizes = { sm: 'px-2.5 py-1 text-xs', md: 'px-3.5 py-1.5 text-sm' }

const variantStyles: Record<string, { base: string; hover: string; active: string }> = {
  primary: {
    base: 'text-white shadow-sm',
    hover: 'shadow-md',
    active: 'shadow-sm brightness-90'
  },
  danger: {
    base: 'text-white shadow-sm',
    hover: 'shadow-md',
    active: 'shadow-sm brightness-90'
  },
  ghost: {
    base: 'bg-transparent',
    hover: 'bg-[var(--color-primary)]/10',
    active: 'bg-[var(--color-primary)]/15'
  },
  text: {
    base: 'bg-transparent',
    hover: 'underline bg-[var(--color-primary)]/5',
    active: 'bg-[var(--color-primary)]/10'
  }
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', style, children, ...props }, ref) => {
    const [hovered, setHovered] = useState(false)
    const [pressed, setPressed] = useState(false)

    const vs = variantStyles[variant]

    const vStyle: React.CSSProperties = (variant === 'primary' || variant === 'danger')
      ? { background: variant === 'danger' ? 'var(--color-danger)' : 'var(--color-primary)' }
      : variant === 'ghost'
      ? { color: 'var(--color-primary)' }
      : { color: 'var(--color-muted)' }

    return (
      <button ref={ref}
        className={`${base} ${vs.base} ${hovered ? vs.hover : ''} ${pressed ? vs.active : ''} ${sizes[size]} ${className}`}
        style={{ ...vStyle, ...style }}
        onMouseEnter={(e) => { setHovered(true); props.onMouseEnter?.(e) }}
        onMouseLeave={(e) => { setHovered(false); setPressed(false); props.onMouseLeave?.(e) }}
        onMouseDown={(e) => { setPressed(true); props.onMouseDown?.(e) }}
        onMouseUp={(e) => { setPressed(false); props.onMouseUp?.(e) }}
        {...props}>{children}</button>
    )
  }
)
Button.displayName = 'Button'
