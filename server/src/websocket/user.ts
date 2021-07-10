import { io } from '../app'

import User, { IUser } from '../models/User'
import UsersService from '../services/UsersService'
import {
  checkIfTokenExists,
  decodeTokenAndCheckValidity
} from '../middlewares/isAuth'

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth.token
    checkIfTokenExists(token)
    const id = decodeTokenAndCheckValidity(token)

    const user = await User.findById(id)
    const usersService = new UsersService()
    await usersService.changeStatusAndSocketId(user, true, socket.id)

    const populatedUser = await usersService.populateUser(user)
    populatedUser.friends
      .filter(({ friendId }) => (<IUser>friendId).isOnline)
      .forEach(({ friendId }) => {
        const socketId = (<IUser>friendId).socketId
        io.to(socketId).emit('new_friend_online', { id, socket: socket.id })
      })

    next()
  } catch (err) {
    next(
      err.originalMessage || 'Something went wrong while authenticate socket'
    )
  }
})
