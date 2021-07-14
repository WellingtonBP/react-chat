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
      state = payload
    }
  }
})

export const reducer = user.reducer
export const actions = user.actions
