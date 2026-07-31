import { notification } from 'antd'
import { useCallback } from 'react'

export function useToast() {
  const [api, contextHolder] = notification.useNotification()

  const success = useCallback(
    (message: string, description?: string) => {
      api.success({ message, description, placement: 'bottomRight', duration: 3 })
    },
    [api]
  )

  const error = useCallback(
    (message: string, description?: string) => {
      api.error({ message, description, placement: 'bottomRight', duration: 5 })
    },
    [api]
  )

  const info = useCallback(
    (message: string, description?: string) => {
      api.info({ message, description, placement: 'bottomRight', duration: 3 })
    },
    [api]
  )

  return { contextHolder, success, error, info }
}
