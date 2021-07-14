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

type NewFriendRequest = {
  type: string
  payload: {
    userId: string
    name: string
    avatar?: string
    mutuals: number
  }
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
    },
    newFriendRequest(state, { payload }: NewFriendRequest) {
      state.requestsReceived = [...state.requestsReceived, payload]
    }
  }
})

export const reducer = user.reducer
export const actions = user.actions
