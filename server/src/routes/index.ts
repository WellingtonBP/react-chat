import { Router } from 'express'

import UsersController from '../controllers/UsersController'

import signupValidators from '../middlewares/signupValidators'
import loginValidators from '../middlewares/loginValidators'
import findFriendsValidators from '../middlewares/findFriendsValidators'
import setUnreadMessagesValidators from '../middlewares/setUnreadMessagesValidators'
import validationCheckResult from '../middlewares/validationCheckResult'
import isAuth from '../middlewares/isAuth'

const route = Router()
const usersController = new UsersController()

route.post(
  '/users/signup',
  signupValidators,
  validationCheckResult,
  usersController.signup
)

route.post(
  '/users/login',
  loginValidators,
  validationCheckResult,
  usersController.login
)

route.get(
  '/friends/find',
  isAuth,
  findFriendsValidators,
  validationCheckResult,
  usersController.findNewFriend
)

route.post(
  '/friends/set-unread-messages',
  isAuth,
  setUnreadMessagesValidators,
  validationCheckResult,
  usersController.setUnreadMessages
)

export default route
