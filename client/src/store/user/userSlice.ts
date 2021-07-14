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
  requestsSent: string[]
}

type SetUserAction = {
  type: string
  payload: UserSlice
}

const initialState: UserSlice = {
  name: '',
  avatar: null,
  requestsReceived: [],
  requestsSent: []
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: SetUserAction) {
      state.name = payload.name
      state.avatar = payload.avatar
      state.requestsReceived = payload.requestsReceived
      state.requestsSent = payload.requestsSent
    }
  }
})

export const reducer = user.reducer
export const actions = user.actions
