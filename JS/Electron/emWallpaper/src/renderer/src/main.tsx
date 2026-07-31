import { App as AntApp, ConfigProvider, theme as antTheme } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import persistStore from 'redux-persist/es/persistStore'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import './assets/global.scss'
import './i18n'
import store from './store'

const persistor = persistStore(store)

function ThemedApp() {
  const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  React.useEffect(() => {
    window.api.getDesktopPath().then((desktop) => {
      const s = store.getState()
      if (!s.config?.savePath && desktop) {
        store.dispatch({ type: 'config/updatePath', payload: desktop })
      }
    })

    const s = store.getState()
    if (s.config?.theme) {
      setThemeMode(s.config.theme)
      document.documentElement.classList.toggle('dark', s.config.theme === 'dark')
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      document.documentElement.classList.toggle('dark', prefersDark)
    }

    if (s.config?.language) {
      import('./i18n').then(({ default: i18n }) => {
        i18n.changeLanguage(s.config.language)
      })
    }

    return store.subscribe(() => {
      const ns = store.getState()
      setThemeMode(ns.config?.theme || 'light')
      document.documentElement.classList.toggle('dark', ns.config?.theme === 'dark')
    })
  }, [])

  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#7c6baa',
        colorSuccess: '#6b9e7a', colorError: '#c4776b', colorWarning: '#c49a6c',
        borderRadius: 8, fontFamily: 'inherit'
      },
      algorithm: themeMode === 'dark' ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm
    }}>
      <AntApp>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <React.StrictMode><App /></React.StrictMode>
          </BrowserRouter>
        </PersistGate>
      </Provider>
      </AntApp>
    </ConfigProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<ThemedApp />)
