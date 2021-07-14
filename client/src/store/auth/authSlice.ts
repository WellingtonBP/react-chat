import { createSlice } from '@reduxjs/toolkit'

type LoginAction = {
  type: string
  payload: {
    token: string
    expiresIn: number
  }
}

type AuthErrorAction = {
  type: string
  payload: {
    message: string
  }
}

const auth = createSlice({
  name: 'auth',
  initialState: {
    isLoading: false,
    isAuthenticated: false,
    token: null,
    expiresIn: null,
    authErr: null
  },
  reducers: {
    startLogin(state) {
      state.isLoading = true
    },
    login(state, { payload }: LoginAction) {
      state.isAuthenticated = true
      state.isLoading = false
      state.token = payload.token
      state.expiresIn = payload.expiresIn
      state.authErr = null
    },
    authError(state, { payload }: AuthErrorAction) {
      state.authErr = payload.message
      state.isLoading = false
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.expiresIn = null
    }
  }
})

export const reducer = auth.reducer
export const actions = auth.actions
