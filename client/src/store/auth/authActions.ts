import { Dispatch, ThunkDispatch, AnyAction } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import { actions as authActions } from './authSlice'
import { actions as userActions } from '../user/userSlice'
import { actions as friendsActions } from '../friends/friendsSlice'
import { login, sign, Token } from '../../services/api'
import socketListeners from '../../services/socketListeners'

function logoutAction(): (dispatch: Dispatch) => void {
  return dispatch => {
    localStorage.removeItem('token')
    dispatch(authActions.logout())
    dispatch(userActions.resetUser())
    dispatch(friendsActions.resetFriends())
  }
}

function authHandler(
  { token, expiresIn }: Token,
  dispatch: Dispatch & ThunkDispatch<any, null | undefined, AnyAction>
): void {
  const socket = io(process.env.REACT_APP_API_HOST, {
    auth: {
      token: token
    }
  })

  socketListeners(socket, dispatch)

  const autoLogoutTimeout = setTimeout(() => {
    alert('Session end')
    dispatch(logoutAction())
  }, expiresIn - Date.now())

  dispatch(
    authActions.login({
      token: token,
      expiresIn: expiresIn,
      autoLogoutTimeout
    })
  )
}

function authAction(
  email: string,
  password: string,
  name?: string
): (
  dispatch: Dispatch & ThunkDispatch<any, null | undefined, AnyAction>
) => void {
  return async dispatch => {
    try {
      dispatch(authActions.startLogin())

      const data: Token = await (name
        ? sign(name, email, password)
        : login(email, password))

      authHandler(data, dispatch)

      localStorage.setItem('token', JSON.stringify(data))
    } catch (err) {
      dispatch(authActions.authError({ message: err.message }))
    }
  }
}

function autoLogin(
  token: Token
): (
  dispatch: Dispatch & ThunkDispatch<any, null | undefined, AnyAction>
) => void {
  return async dispatch => {
    try {
      if (token.expiresIn - Date.now() <= 0) return

      dispatch(authActions.startLogin())

      authHandler(token, dispatch)
    } catch (err) {
      dispatch(authActions.authError({ message: err.message }))
    }
  }
}

export { authAction, logoutAction, autoLogin }
