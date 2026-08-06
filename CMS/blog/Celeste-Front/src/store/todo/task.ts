import { createSlice, createReducer } from '@reduxjs/toolkit'

export interface Task {
  id: number
  title: string,
  description: string
  isDone: boolean
}

export const taskSlice = createSlice({
  name: 'taskState',
  initialState: {
    focusTask: "INIT",
    taskList: [] as Task[]
  },
  reducers: {
    setFocusTask: (state, payload) => {
      state.focusTask = payload.payload as string
    },
    appendTask: (state, payload) => {
      state.taskList.push(payload.payload)
    },
    deleteTask: (state, payload) => {
      const willDelTaskId = payload.payload
      state.taskList = state.taskList.filter(task => task.id !== willDelTaskId)
      console.log("del")
    },
    cleanAll: (state, payload) => {
      state.focusTask = ""
      state.taskList = []
    },
  }
})
export const { setFocusTask, appendTask, deleteTask, cleanAll } = taskSlice.actions

export default taskSlice.reducer