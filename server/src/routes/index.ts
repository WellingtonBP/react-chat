import { Router } from 'express'
import multer from 'multer'

import multerConfig from '../utils/multerConfig'
import UsersController from '../controllers/UsersController'

import signupValidators from '../middlewares/signupValidators'
import loginValidators from '../middlewares/loginValidators'
import findFriendsValidators from '../middlewares/findFriendsValidators'
import setUnreadMessagesValidators from '../middlewares/setUnreadMessagesValidators'
import clearChatValidators from '../middlewares/clearChatValidators'
import validationCheckResult from '../middlewares/validationCheckResult'
import isAuth from '../middlewares/isAuth'

const route = Router()
const upload = multer(multerConfig)
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

route.post(
  '/users/change-avatar',
  isAuth,
  validationCheckResult,
  upload.single('avatar'),
  usersController.uploadAvatar
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

route.post(
  '/friends/clear-chat',
  isAuth,
  clearChatValidators,
  validationCheckResult,
  usersController.clearChat
)

export default route
