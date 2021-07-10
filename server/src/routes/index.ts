import { Router } from 'express'

import UsersController from '../controllers/UsersController'

import signupValidators from '../middlewares/signupValidators'
import loginValidators from '../middlewares/loginValidators'
import validationCheckResult from '../middlewares/validationCheckResult'

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

export default route
