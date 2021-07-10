import Chat from '../models/Chat'
import User, { IUser } from '../models/User'

type FindOrRequestResponseBaseType = {
  name: string
  avatar?: string
  mutuals: number
}

function mutualFriendsCounter(user: IUser, currentUser: IUser): number {
  return user.friends.filter(
    ({ friendId }) =>
      currentUser.friends.findIndex(
        ({ friendId: currentUserFriendId }) =>
          currentUserFriendId.toString() === friendId.toString()
      ) !== -1
  ).length
}

class FriendsService {
  async find(
    name: string,
    id: string
  ): Promise<(FindOrRequestResponseBaseType & { id: string })[]> {
    const users = await User.find({
      name: { $regex: name, $options: 'gi' }
    }).select('name avatar friends')

    const currentUser = await User.findById(id).select(
      'friends requestsSent requestsReceived -_id'
    )

    const parsedUsers = users
      .filter(
        user =>
          currentUser.friends.findIndex(
            ({ friendId }) => friendId.toString() === user._id.toString()
          ) === -1 &&
          !currentUser.requestsSent.includes(user._id) &&
          !currentUser.requestsReceived.includes(user._id)
      )
      .map(user => {
        return {
          id: user._id,
          name: user.name,
          avatar: user.avatar,
          mutuals: mutualFriendsCounter(user, currentUser)
        }
      })

    return parsedUsers
  }

  async request(
    currentUser: IUser,
    user: IUser
  ): Promise<FindOrRequestResponseBaseType & { userId: string }> {
    const requestReceived = {
      userId: currentUser._id,
      name: currentUser.name,
      avatar: currentUser.avatar,
      mutuals: mutualFriendsCounter(user, currentUser)
    }
    user.requestsReceived.push(requestReceived)
    currentUser.requestsSent.push(user._id)
    await user.save()
    await currentUser.save()

    return requestReceived
  }

  async accept(currentUser: IUser, id: string): Promise<void> {
    const user = await User.findById(id)

    if (user.requestsSent.includes(currentUser._id)) {
      const chat = new Chat()

      const friendCfg = {
        chatId: chat._id,
        isRemoved: false,
        unreadMessages: 0
      }

      user.requestsSent = user.requestsSent.filter(
        request => request.toString() !== currentUser._id.toString()
      )
      user.friends.push({
        ...friendCfg,
        friendId: currentUser._id
      })

      currentUser.requestsReceived = currentUser.requestsReceived.filter(
        request => request.toString() !== user._id.toString()
      )
      currentUser.friends.push({
        ...friendCfg,
        friendId: user._id
      })

      await chat.save()
      await user.save()
      await currentUser.save()
    }
  }
}

export default FriendsService
