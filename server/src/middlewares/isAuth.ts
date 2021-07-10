import { Request, Response, NextFunction } from 'express'
import { verify, JwtPayload } from 'jsonwebtoken'

import ICustomError from '../utils/ICustomError'

interface IDecodedToken extends JwtPayload {
  id: string
}

export interface IAuthenticatedReq extends Request {
  userId?: string
}

export function checkIfTokenExists(token: string): never | void {
  if (!token) {
    const err: ICustomError = new Error()
    err.originalMessage = 'No token found'
    err.statusCode = 401
    throw err
  }
}

export function decodeTokenAndCheckValidity(token: string): never | string {
  try {
    const decodedToken = verify(token, process.env.JWT_SECRET) as IDecodedToken
    return decodedToken.id
  } catch (err) {
    err.originalMessage = 'Invalid token'
    err.statusCode = 401
    throw err
  }
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
    checkIfTokenExists(token)

    req.userId = decodeTokenAndCheckValidity(token)
    next()
  } catch (err) {
    next(err)
  }
}

export default isAuth
