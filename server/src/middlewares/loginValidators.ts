import { body } from 'express-validator'

export default [
  body(['email', 'password'])
    .trim()
    .notEmpty()
    .withMessage('Should not be empty'),
  body('email').isEmail().withMessage('Invalid email')
]
