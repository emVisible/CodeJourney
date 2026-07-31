import { Component, type ReactNode } from 'react'
import { Button, Result } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import i18n from '@renderer/i18n'

interface Props { children: ReactNode }
interface State { hasError: boolean; error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) { super(props); this.state = { hasError: false, error: null } }
  static getDerivedStateFromError(error: Error): State { return { hasError: true, error } }
  componentDidCatch(error: Error, info: { componentStack: string }) { console.error('[ErrorBoundary]', error, info.componentStack) }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen" style={{ background: 'var(--color-bg)' }}>
          <Result status="error" title={i18n.t('error.title')} subTitle={this.state.error?.message || ''}
            extra={<Button type="primary" icon={<ReloadOutlined />} onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}>
              {i18n.t('error.reload')}</Button>} />
        </div>
      )
    }
    return this.props.children
  }
}
