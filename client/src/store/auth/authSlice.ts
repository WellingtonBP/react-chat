import { createSlice } from '@reduxjs/toolkit'

type AuthSlice = {
  isLoading: boolean
  isAuthenticated: boolean
  token?: string
  expiresIn?: number
  authErr?: any
  autoLogoutTimeout?: NodeJS.Timeout
}

type LoginAction = {
  type: string
  payload: {
    token: string
    expiresIn: number
    autoLogoutTimeout: NodeJS.Timeout
  }
}

type AuthErrorAction = {
  type: string
  payload: {
    message: string
  }
}

const initialState: AuthSlice = {
  isLoading: false,
  isAuthenticated: false
}

const auth = createSlice({
  name: 'auth',
  initialState,
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
      state.autoLogoutTimeout = payload.autoLogoutTimeout
    },
    authError(state, { payload }: AuthErrorAction) {
      state.authErr = payload.message
      state.isLoading = false
    },
    logout(state) {
      state.isAuthenticated = false
      state.token = null
      state.expiresIn = null
      if (state.autoLogoutTimeout) clearTimeout(state.autoLogoutTimeout)
    }
  }
})

export const reducer = auth.reducer
export const actions = auth.actions
