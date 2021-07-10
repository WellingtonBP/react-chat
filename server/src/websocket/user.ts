import { io } from '../app'

import User, { IUser } from '../models/User'
import UsersService from '../services/UsersService'
import FriendsService from '../services/FriendsService'
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

    const userFriends = (await usersService.populateUser(user)).friends
    userFriends
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

io.on('connect', socket => {
  const friendsService = new FriendsService()
  const usersService = new UsersService()

  socket.on('send_friend_request', async ({ id }) => {
    if (!id) return

    const currentUser = await User.findOne({ socketId: socket.id })
    const user = await User.findById(id)

    if (user && currentUser) {
      const request = await friendsService.request(currentUser, user)
      if (user.isOnline) {
        io.to(user.socketId).emit('new_friend_request', request)
      }
    }
  })

  socket.on('accept_friend_request', async ({ id }) => {
    if (!id) return

    const currentUser = await User.findOne({ socketId: socket.id })
    const user = await User.findById(id)

    if (user && currentUser) {
      const acceptFriendResponse = await friendsService.accept(
        currentUser,
        user
      )
      if (user.isOnline) {
        io.to(user.socketId).emit('accepted_friend_request', {
          ...acceptFriendResponse,
          friendId: {
            _id: user._id,
            name: user.name,
            avatar: user.avatar,
            isOnline: user.isOnline,
            socketId: user.socketId
          }
        })
      }
    }
  })

  socket.on('disconnect', async () => {
    const user = await User.findOne({ socketId: socket.id })
    await usersService.changeStatusAndSocketId(user, false)

    const userFriends = (await usersService.populateUser(user)).friends
    userFriends
      .filter(({ friendId }) => (<IUser>friendId).isOnline)
      .forEach(({ friendId }) => {
        const socketId = (<IUser>friendId).socketId
        io.to(socketId).emit('friend_disconnect', { id: user._id })
      })
  })
})
