import { hash } from 'bcrypt'
import fs from 'fs/promises'
import path from 'path'

import { IChat } from '../models/Chat'
import User, { IUser } from '../models/User'
import ICustomError from '../utils/ICustomError'

function clearImage(filePath: string) {
  filePath = path.join(__dirname, '..', '..', filePath)
  console.log(filePath)
  fs.unlink(filePath)
}

class UsersService {
  async create(name: string, email: string, password: string): Promise<string> {
    const hashedPassword = await hash(password, 8)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return user._id
  }

  async changeStatusAndSocketId(
    user: IUser,
    isOnline: boolean,
    socketId?: string
  ): Promise<void> {
    user.isOnline = isOnline
    user.socketId = socketId || ''
    await user.save()
  }

  async populateUser(user: IUser): Promise<IUser> {
    if (user.friends.length > 0) {
      const populatedUser = await user
        .populate('friends.friendId', 'name avatar isOnline socketId')
        .populate('friends.chatId', '-_id')
        .execPopulate()

      // filter messages
      populatedUser.friends = populatedUser.friends.map(friend => {
        if (friend.cleanedAt) {
          ;(<IChat>friend.chatId).messages = (<IChat>(
            friend.chatId
          )).messages.filter(message => message.senderAt > friend.cleanedAt)
        }
        return friend
      })
      return populatedUser
    }

    return user
  }

  async uploadAvatar(
    user: IUser,
    file: Express.Multer.File
  ): Promise<string | never> {
    if (!file) {
      const error: ICustomError = new Error()
      error.statusCode = 422
      error.originalMessage = 'Invalid file'
      throw error
    }
    const currentAvatar = user.avatar
    const newAvatar = file.path.replace('\\', '/')
    user.avatar = newAvatar
    await user.save()
    if (currentAvatar) clearImage(currentAvatar)
    return newAvatar
  }
}

export default UsersService
