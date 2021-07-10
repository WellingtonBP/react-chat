import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import User from '../models/User'
import UsersService from '../services/UsersService'
import ICustomError from '../utils/ICustomError'

class UsersController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body
      const usersService = new UsersService()

      const { requestsReceived, requestsSent, friends, _id, avatar } =
        await usersService.create(name, email, password)

      const token = sign({ id: _id.toString() }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
      })

      res.status(201).json({
        name,
        avatar,
        friends,
        requestsReceived,
        requestsSent,
        token
      })
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body
      const usersService = new UsersService()

      const user = await User.findOne({ email })
      if (!user) {
        const err: ICustomError = new Error()
        err.originalMessage = 'User not found'
        err.statusCode = 404
        throw err
      }

      const isPasswordCorrect = await compare(password, user.password)
      if (!isPasswordCorrect) {
        const err: ICustomError = new Error()
        err.originalMessage = 'Invalid Password'
        err.statusCode = 403
        throw err
      }

      const { requestsReceived, requestsSent, friends, _id, avatar, name } =
        await usersService.populateUser(user)

      const token = sign({ id: _id.toString() }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
      })

      res.status(200).json({
        name,
        avatar,
        friends,
        requestsSent,
        requestsReceived,
        token
      })
    } catch (err) {
      next(err)
    }
  }
}

export default UsersController
