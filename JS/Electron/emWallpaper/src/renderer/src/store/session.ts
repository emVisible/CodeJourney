import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CollectionEpisode {
  id: string
  title: string
  url: string
  duration: number
  thumbnail: string
  selected?: boolean
}

export interface VideoFormat {
  url: string
  name: string
  format: string
  type: string
  id?: string
  hasVideo?: boolean
  hasAudio?: boolean
  resolution?: string
  ext?: string
  size?: number
}

export interface VideoPart {
  title: string
  cid: number
  duration: number
  formats: VideoFormat[]
}

export interface VideoInfo {
  title: string
  cover: string
  uploader: string
  duration: number
  parts: VideoPart[]
  bestAudioId?: string
  isCollection?: boolean
  collectionTitle?: string
  collectionUrl?: string
  episodes?: CollectionEpisode[]
}

export interface ScannedAsset {
  url: string
  name: string
  type: string
  selected?: boolean
  format?: string
  size?: number
}

export interface SessionState {
  urlsText: string
  videoInfo: VideoInfo | null
  scannedAssets: ScannedAsset[]
  isBili: boolean
  selectedQuality: string
  selectedPartIdx: number
  downloading: boolean
  autoScan: boolean
}

const initialState: SessionState = {
  urlsText: '',
  videoInfo: null,
  scannedAssets: [],
  isBili: false,
  selectedQuality: '',
  selectedPartIdx: 0,
  downloading: false,
  autoScan: false
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setUrlsText(state, action: PayloadAction<string>) {
      state.urlsText = action.payload
    },
    setVideoInfo(state, action: PayloadAction<VideoInfo | null>) {
      state.videoInfo = action.payload
    },
    setScannedAssets(state, action: PayloadAction<ScannedAsset[]>) {
      state.scannedAssets = action.payload
    },
    setIsBili(state, action: PayloadAction<boolean>) {
      state.isBili = action.payload
    },
    setSelectedQuality(state, action: PayloadAction<string>) {
      state.selectedQuality = action.payload
    },
    setSelectedPartIdx(state, action: PayloadAction<number>) {
      state.selectedPartIdx = action.payload
    },
    setDownloading(state, action: PayloadAction<boolean>) {
      state.downloading = action.payload
    },
    setAutoScan(state, action: PayloadAction<boolean>) {
      state.autoScan = action.payload
    },
    toggleScannedAsset(state, action: PayloadAction<number>) {
      const idx = action.payload
      if (idx >= 0 && idx < state.scannedAssets.length) {
        state.scannedAssets[idx] = { ...state.scannedAssets[idx], selected: !state.scannedAssets[idx].selected }
      }
    },
    toggleEpisode(state, action: PayloadAction<number>) {
      const idx = action.payload
      if (state.videoInfo?.episodes && idx >= 0 && idx < state.videoInfo.episodes.length) {
        state.videoInfo.episodes[idx] = { ...state.videoInfo.episodes[idx], selected: !state.videoInfo.episodes[idx].selected }
      }
    },
    selectAllEpisodes(state, action: PayloadAction<boolean>) {
      if (state.videoInfo?.episodes) {
        state.videoInfo.episodes = state.videoInfo.episodes.map((e) => ({ ...e, selected: action.payload }))
      }
    },
    clearSession() {
      return initialState
    }
  }
})

export const {
  setUrlsText,
  setVideoInfo,
  setScannedAssets,
  setIsBili,
  setSelectedQuality,
  setSelectedPartIdx,
  setDownloading,
  setAutoScan,
  toggleScannedAsset,
  toggleEpisode,
  selectAllEpisodes,
  clearSession
} = sessionSlice.actions
export default sessionSlice.reducer
