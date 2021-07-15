import { body } from 'express-validator'

export default [
  body(['friendId', 'date'])
    .trim()
    .notEmpty()
    .withMessage('Should not be empty'),
  body(['friendId']).isMongoId().withMessage('Invalid friend id'),
  body(['date']).isNumeric().withMessage('Date must be in milliseconds')
]
