import { Dispatch } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import { actions as authActions } from './authSlice'
import { actions as userActions } from '../user/userSlice'
import { actions as friendsActions } from '../friends/friendsSlice'
import { login, sign, SignResponse, LoginResponse } from '../../services/api'
import socketListeners from '../../services/socketListeners'

function authAction(
  email: string,
  password: string,
  name?: string
): (dispatch: Dispatch) => void {
  return async dispatch => {
    try {
      dispatch(authActions.startLogin())

      const data: SignResponse | LoginResponse = await (name
        ? sign(name, email, password)
        : login(email, password))

      const socket = io(process.env.REACT_APP_API_HOST, {
        auth: {
          token: data.token
        }
      })

      socketListeners(socket, dispatch)

      dispatch(
        authActions.login({ token: data.token, expiresIn: data.expiresIn })
      )
      dispatch(
        userActions.setUser({
          name: data.name,
          avatar: data.avatar,
          requestsReceived: data.requestsReceived,
          socket
        })
      )
      dispatch(friendsActions.setFriends(data.friends))
    } catch (err) {
      dispatch(authActions.authError({ message: err.message }))
    }
  }
}

export { authAction }
