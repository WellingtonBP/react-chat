import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import ICustomError from '../utils/ICustomError'

function validationCheckResult(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const validationErrors = validationResult(req)
  if (!validationErrors.isEmpty()) {
    const info = {}
    for (let validationError of validationErrors.array()) {
      if (info[validationError.param]) {
        info[validationError.param].msgs.push(validationError.msg)
      } else {
        info[validationError.param] = {
          msgs: [validationError.msg]
        }
      }
    }
    const err: ICustomError = new Error()
    err.originalMessage = 'Validation Error'
    err.statusCode = 422
    err.info = info
    next(err)
  } else next()
}

export default validationCheckResult
