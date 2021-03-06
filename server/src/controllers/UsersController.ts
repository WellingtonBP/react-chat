import { Request, Response, NextFunction } from 'express'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'

import User from '../models/User'
import UsersService from '../services/UsersService'
import FriendsService from '../services/FriendsService'
import { IAuthenticatedReq } from '../middlewares/isAuth'
import ICustomError from '../utils/ICustomError'

class UsersController {
  async signup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, email, password } = req.body
      const usersService = new UsersService()

      const id = (await usersService.create(name, email, password)).toString()

      const token = sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
      })

      res.status(201).json({
        token,
        expiresIn: Date.now() + 3600000
      })
    } catch (err) {
      next(err)
    }
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body

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

      const token = sign({ id: user._id.toString() }, process.env.JWT_SECRET!, {
        expiresIn: '1h'
      })

      res.status(200).json({
        token,
        expiresIn: Date.now() + 3600000
      })
    } catch (err) {
      next(err)
    }
  }

  async findNewFriend(
    req: IAuthenticatedReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { name } = req.query
      const id = req.userId
      const friendsService = new FriendsService()

      const foundUsers = await friendsService.find(String(name), id)

      res.status(200).json(foundUsers)
    } catch (err) {
      next(err)
    }
  }

  async setUnreadMessages(
    req: IAuthenticatedReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { friendId, reset } = req.body
      const id = req.userId
      const friendsService = new FriendsService()

      await friendsService.setUnreadMessages(id, friendId, reset === 'true')

      res.status(204).end()
    } catch (err) {
      next(err)
    }
  }

  async clearChat(
    req: IAuthenticatedReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { friendId, date } = req.body
      const id = req.userId
      const friendsService = new FriendsService()

      const user = await User.findById(id)

      await friendsService.clearChat(user, friendId, Number(date))

      res.status(204).end()
    } catch (err) {
      next(err)
    }
  }

  async uploadAvatar(
    req: IAuthenticatedReq,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { file } = req
      const id = req.userId
      const user = await User.findById(id)
      const usersService = new UsersService()

      const newAvatar = await usersService.uploadAvatar(user, file)

      res.status(201).json({
        message: 'sucess',
        avatar: newAvatar
      })
    } catch (err) {
      next(err)
    }
  }
}

export default UsersController
