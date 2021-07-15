import { hash } from 'bcrypt'
import { IsNumericOptions } from 'express-validator/src/options'

import { IChat } from '../models/Chat'
import User, { IUser } from '../models/User'

class UsersService {
  async create(name: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await hash(password, 8)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return user
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
          friend = {
            ...friend,
            chatId: {
              ...friend.chatId,
              messages: (<IChat>friend.chatId).messages.filter(
                message => message.senderAt > friend.cleanedAt
              )
            }
          } as typeof friend
        }
        return friend
      })

      return populatedUser
    }
    return user
  }
}

export default UsersService
