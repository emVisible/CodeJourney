import { useEffect, useRef } from 'react'

type ShortcutMap = Record<string, () => void>

export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  const ref = useRef(shortcuts)
  ref.current = shortcuts

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey
      let key = ''
      if (mod) key += 'mod+'
      if (e.shiftKey) key += 'shift+'
      key += e.key.toLowerCase()

      const action = ref.current[key]
      if (action) {
        e.preventDefault()
        action()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, []) // eslint-disable-line
}
