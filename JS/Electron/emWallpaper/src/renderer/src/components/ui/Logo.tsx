import { useSelector } from 'react-redux'
import type { RootState } from '@renderer/store'

export default function Logo({ size = 26 }: { size?: number }) {
  const theme = useSelector((s: RootState) => s.config.theme)
  const isDark = theme === 'dark'
  const lightStart = '#9b87c7'
  const lightEnd = '#5a4a8a'
  const darkStart = '#b8a4d9'
  const darkEnd = '#7c6baa'
  const gradId = `cv-logo-${isDark ? 'd' : 'l'}`

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={gradId} cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor={isDark ? darkStart : lightStart} />
          <stop offset="100%" stopColor={isDark ? darkEnd : lightEnd} />
        </radialGradient>
      </defs>
      <rect width="32" height="32" rx="8.5" fill={`url(#${gradId})`} />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8" stroke="white" strokeOpacity={isDark ? 0.12 : 0.08} />
      <path d="M16 7L22 16L16 25L10 16Z" fill="white" fillOpacity={isDark ? 0.1 : 0.08} />
      <path d="M16 7L19 16L16 14Z" fill="white" fillOpacity={isDark ? 0.5 : 0.45} />
      <path d="M19 16L22 16L16 25Z" fill="white" fillOpacity={isDark ? 0.18 : 0.15} />
      <path d="M16 25L10 16L13 16Z" fill="white" fillOpacity={isDark ? 0.3 : 0.25} />
      <path d="M13 16L10 16L16 7Z" fill="white" fillOpacity={isDark ? 0.4 : 0.35} />
      <circle cx="16" cy="14" r="1.5" fill="white" />
    </svg>
  )
}
