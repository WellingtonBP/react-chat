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

    const fromUser = await User.findOne({ socketId: socket.id })
    const toUser = await User.findById(id)
    if (!toUser || !fromUser) return

    const request = await friendsService.request(fromUser, toUser)
    if (toUser.isOnline) {
      io.to(toUser.socketId).emit('new_friend_request', request)
    }
  })

  socket.on('accept_friend_request', async ({ id }, callback) => {
    if (!id || !callback) return

    const user = await User.findOne({ socketId: socket.id })
    const acceptedFriend = await User.findById(id)
    if (!user || !acceptedFriend) return

    const acceptFriendResponse = await friendsService.accept(
      user,
      acceptedFriend
    )
    if (acceptedFriend.isOnline) {
      io.to(acceptedFriend.socketId).emit('accepted_friend_request', {
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
    callback({
      ...acceptFriendResponse,
      friendId: {
        _id: acceptedFriend._id,
        name: acceptedFriend.name,
        avatar: acceptedFriend.avatar,
        isOnline: acceptedFriend.isOnline,
        socketId: acceptedFriend.socketId
      }
    })
  })

  socket.on('send_message', async ({ content, senderAt, id, chatId }) => {
    if (!content || !senderAt || !id || !chatId) return

    const fromUser = await User.findOne({ socketId: socket.id })
    const toUser = await User.findById(id)
    if (!toUser || !fromUser) return

    const message = {
      content,
      senderAt,
      sender: fromUser._id
    }
    await friendsService.sendMessage(chatId, message)
    if (toUser.isOnline) {
      io.to(toUser.socketId).emit('new_message', message)
    }
  })

  socket.on('remove_friend', async ({ id }) => {
    if (!id) return

    const user = await User.findOne({ socketId: socket.id })
    const removedUser = await User.findById(id)
    if (!user || !removedUser) return

    await friendsService.remove(user, removedUser)
    if (removedUser.isOnline) {
      io.to(removedUser.socketId).emit('removed_friend', { id: user._id })
    }
  })

  socket.on('clear_chat', async ({ id }) => {
    if (!id) return

    const user = await User.findOne({ socketId: socket.id })
    if (!user) return

    await friendsService.clearChat(user, id)
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
