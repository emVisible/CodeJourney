import '@/assets/global.scss'
import '@/plugins/tailwind/index.scss'
import { ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Welcome from './components/Welcome.tsx'
import { Provider } from 'react-redux'
import store from './store/index.ts'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
let persistor = persistStore(store);

ConfigProvider.config({
  theme: {},
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider>
          <BrowserRouter>
            <div className="relative">
              <Welcome></Welcome>
              <App />
            </div>
          </BrowserRouter>
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
