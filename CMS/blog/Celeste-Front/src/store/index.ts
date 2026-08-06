import { configureStore } from '@reduxjs/toolkit';

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import focus from './todo/focus';
import task from './todo/task';

const reducers = combineReducers({
  task: task,
  focus: focus
})

const persistConfig = {
  key: 'celeste',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
// const res = store.getState()
export type RootState = ReturnType<typeof store.getState>
export type RootDispatch = typeof store.dispatch

export default store