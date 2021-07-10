import { Router } from 'express'

import UsersController from '../controllers/UsersController'

import signupValidators from '../middlewares/signupValidators'
import loginValidators from '../middlewares/loginValidators'
import findFriendsValidators from '../middlewares/findFriendsValidators'
import validationCheckResult from '../middlewares/validationCheckResult'
import isAuth from '../middlewares/isAuth'

const route = Router()
const usersController = new UsersController()

route.post(
  'users/signup',
  signupValidators,
  validationCheckResult,
  usersController.signup
)

route.post(
  'users/login',
  loginValidators,
  validationCheckResult,
  usersController.login
)

route.get(
  'users/friends/find',
  isAuth,
  findFriendsValidators,
  validationCheckResult,
  usersController.findNewFriend
)

export default route
