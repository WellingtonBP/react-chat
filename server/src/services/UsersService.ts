import { hash } from 'bcrypt'

import { IChat } from '../models/Chat'
import User, { IUser } from '../models/User'

class UsersService {
  async create(name: string, email: string, password: string): Promise<IUser> {
    const hashedPassword = await hash(password, 8)
    const user = new User({ name, email, password: hashedPassword })
    await user.save()
    return user
  }

  async populateUser(user: IUser): Promise<IUser> {
    if (user.friends.length > 0) {
      const populatedUser = await user
        .populate('friends.friendId', 'name avatar isOnline')
        .populate('friends.chatId', '-_id')
        .execPopulate()

      // filter "deleted" users and messages
      populatedUser.friends = populatedUser.friends
        .filter(friend => !friend.isRemoved)
        .map(friend => {
          if (friend.cleanedAt) {
            return {
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