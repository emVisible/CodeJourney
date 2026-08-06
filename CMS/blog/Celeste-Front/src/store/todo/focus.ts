import { createSlice } from '@reduxjs/toolkit'

export const taskSlice = createSlice({
  name: 'focusState',
  initialState: {
    focus: false,
    isFocusSet: false,
  },
  reducers: {
    toggleFocusState: (state, payload) => {
      if (payload.payload !== null) {
        state.focus = payload.payload
      } else {
        state.focus = !state.focus
      }
    },
    toggleIsFocusSetState: (state, payload) => {
      if (payload.payload !== null) {
        state.isFocusSet = payload.payload
      } else {
        state.isFocusSet = !state.isFocusSet
      }
    },
  }
})
export const { toggleFocusState, toggleIsFocusSetState } = taskSlice.actions

export default taskSlice.reducer