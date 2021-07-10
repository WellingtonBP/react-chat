import Chat from '../models/Chat'
import User, { IUser } from '../models/User'

type FindResponse = Array<{
  id: string
  name: string
  avatar?: string
  mutuals: number
}>

class FriendsService {
  async find(name: string, id: string): Promise<FindResponse> {
    const users = await User.find({
      name: { $regex: name, $options: 'gi' }
    }).select('name avatar friends')

    const currentUser = await User.findById(id).select(
      'friends requestsSent requestsReceived -_id'
    )

    // remove users who friendship was requested or is friend already and formating response
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
          mutuals: user.friends.filter(
            ({ friendId }) =>
              currentUser.friends.findIndex(
                ({ friendId: currentUserFriendId }) =>
                  currentUserFriendId.toString() === friendId.toString()
              ) !== -1
          ).length
        }
      })

    return parsedUsers
  }

  async request(user: IUser, id: string): Promise<void> {
    const currentUser = await User.findById(id)

    if (!user.requestsReceived.includes(currentUser._id)) {
      user.requestsReceived.push(currentUser._id)
      currentUser.requestsSent.push(user._id)
      await user.save()
      await currentUser.save()
    }
  }

  async accept(user: IUser, id: string): Promise<void> {
    const currentUser = await User.findById(id)

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
