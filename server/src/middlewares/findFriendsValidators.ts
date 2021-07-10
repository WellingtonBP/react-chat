import { query } from 'express-validator'

export default [
  query(['name']).trim().notEmpty().withMessage('Should not be empty')
]
