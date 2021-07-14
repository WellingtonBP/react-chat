import { Dispatch } from '@reduxjs/toolkit'

import { actions as authActions } from './authSlice'
import { actions as userActions } from '../user/userSlice'
import { actions as friendsActions } from '../friends/friendsSlice'
import { login, sign } from '../../services/api'

import SignAndLoginResponse from '../../types/SignAndLoginResponse'

function authAction(
  email: string,
  password: string,
  name?: string
): (dispatch: Dispatch) => void {
  return async dispatch => {
    try {
      dispatch(authActions.startLogin())

      const data: SignAndLoginResponse = await (name
        ? sign(name, email, password)
        : login(email, password))

      dispatch(
        authActions.login({ token: data.token, expiresIn: data.expiresIn })
      )

      dispatch(
        userActions.setUser({
          name: data.name,
          avatar: data.avatar,
          requestsReceived: data.requestsReceived,
          requestsSent: data.requestsSent
        })
      )

      dispatch(friendsActions.setFriends(data.friends))
    } catch (err) {
      dispatch(authActions.authError({ message: err.message }))
    }
  }
}

export { authAction }
