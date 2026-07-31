import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, createMigrate } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import configReducer from './config'
import downloadReducer from './download'
import sessionReducer from './session'

const rootReducer = combineReducers({
  config: configReducer,
  download: downloadReducer,
  session: sessionReducer
})

const migrations = {
  0: (state: any) => {
    if (state && 'ConfigReducer' in state) {
      return {
        config: state.ConfigReducer || undefined,
        download: state.DownloadReducer || undefined
      }
    }
    return state
  },
  1: (state: any) => {
    if (state?.config) {
      return {
        ...state,
        config: {
          ...state.config,
          clipboardDetect: state.config.clipboardDetect || { enabled: true, bilibili: true, youtube: true },
          language: state.config.language || 'zh'
        }
      }
    }
    return state
  }
}

const persistConfig = {
  key: 'store',
  version: 2,
  storage,
  whitelist: ['config', 'download'],
  migrate: createMigrate(migrations, { debug: false })
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
