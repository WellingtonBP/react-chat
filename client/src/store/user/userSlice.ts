import { createSlice } from '@reduxjs/toolkit'

type UserSlice = {
  name: string
  avatar?: string
  requestsReceived: {
    userId: string
    name: string
    avatar?: string
    mutuals: number
  }[]
  socket: any
}

type SetUserAction = {
  type: string
  payload: UserSlice
}

const initialState: UserSlice = {
  name: '',
  avatar: null,
  requestsReceived: [],
  socket: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: SetUserAction) {
      state.name = payload.name
      state.avatar = payload.avatar
      state.requestsReceived = payload.requestsReceived
      state.socket = payload.socket
    }
  }
})

export const reducer = user.reducer
export const actions = user.actions
