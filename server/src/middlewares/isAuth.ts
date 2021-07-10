import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

import ICustomError from '../utils/ICustomError'

export interface IAuthenticatedReq extends Request {
  userId?: string
}

interface IDecodedToken extends JwtPayload {
  id: string
}

function isAuth(
  req: IAuthenticatedReq,
  res: Response,
  next: NextFunction
): void {
  try {
    const tokenHeader = req.get('Authorization')
    if (!tokenHeader) {
      const err: ICustomError = new Error()
      err.originalMessage = 'No authorization header found'
      err.statusCode = 401
      throw err
    }

    const [, token] = tokenHeader.split(' ')
    if (!token) {
      const err: ICustomError = new Error()
      err.originalMessage = 'Invalid authorization header'
      err.statusCode = 401
      throw err
    }

    const decodedToken = verify(token, process.env.JWT_SECRET) as IDecodedToken
    if (!decodedToken) {
      const err: ICustomError = new Error()
      err.originalMessage = 'Invalid token'
      err.statusCode = 401
      throw err
    }

    req.userId = decodedToken.id
    next()
  } catch (err) {
    next(err)
  }
}

export default isAuth
