import { body } from 'express-validator'
import User from '../models/User'

export default [
  body(['name', 'email', 'password'])
    .trim()
    .notEmpty()
    .withMessage('Should not be empty'),
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .custom(async email => {
      const user = await User.findOne({ email })
      if (user) throw new Error('Email already in use')
      return true
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Invalid password size (min: 6 characters)')
]
