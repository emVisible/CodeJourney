import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Project {
  id: string
  name: string
  createdAt: number
}

export type ThemeMode = 'light' | 'dark'

export interface ConfigState {
  savePath: string
  projects: Project[]
  activeProject: string
  theme: ThemeMode
  language: string
  clipboardDetect: {
    enabled: boolean
    bilibili: boolean
    youtube: boolean
  }
}

const initialState: ConfigState = {
  savePath: '',
  projects: [{ id: 'default', name: '默认素材', createdAt: Date.now() }],
  activeProject: 'default',
  theme: 'light',
  language: 'zh',
  clipboardDetect: {
    enabled: true,
    bilibili: true,
    youtube: true
  }
}

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    updatePath(state, action: PayloadAction<string>) {
      state.savePath = action.payload
    },
    hydrateProjects(state, action: PayloadAction<Project[]>) {
      state.projects = action.payload
    },
    addProject(state, action: PayloadAction<Project>) {
      state.projects.push(action.payload)
    },
    renameProject(state, action: PayloadAction<{ id: string; name: string }>) {
      const p = state.projects.find((p) => p.id === action.payload.id)
      if (p) p.name = action.payload.name
    },
    removeProject(state, action: PayloadAction<string>) {
      state.projects = state.projects.filter((p) => p.id !== action.payload)
      if (state.activeProject === action.payload) {
        state.activeProject = state.projects[0]?.id || 'default'
      }
    },
    setActiveProject(state, action: PayloadAction<string>) {
      state.activeProject = action.payload
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload
    },
    updateClipboardDetect(state, action: PayloadAction<Partial<ConfigState['clipboardDetect']>>) {
      state.clipboardDetect = { ...state.clipboardDetect, ...action.payload }
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload
    }
  }
})

export const {
  updatePath,
  hydrateProjects,
  addProject,
  renameProject,
  removeProject,
  setActiveProject,
  toggleTheme,
  setTheme,
  updateClipboardDetect,
  setLanguage
} = configSlice.actions
export default configSlice.reducer
