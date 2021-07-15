import { body } from 'express-validator'

export default [
  body(['friendId', 'reset'])
    .trim()
    .notEmpty()
    .withMessage('Should not be empty'),
  body(['friendId']).isMongoId().withMessage('Invalid ID'),
  body(['reset']).isBoolean().withMessage('Reset must be a boolean value')
]
