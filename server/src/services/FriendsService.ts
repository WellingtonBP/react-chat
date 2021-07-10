import Chat, { Message } from '../models/Chat'
import User, { IUser } from '../models/User'

type FindOrRequestResponseBaseType = {
  name: string
  avatar?: string
  mutuals: number
}

type AcceptResponse = {
  unreadMessages: number
  isRemoved: boolean
  chatId: string
}

function mutualFriendsCounter(user1: IUser, user2: IUser): number {
  return user1.friends.filter(
    ({ friendId }) =>
      user2.friends.findIndex(
        ({ friendId: User2FriendId }) =>
          User2FriendId.toString() === friendId.toString()
      ) !== -1
  ).length
}

class FriendsService {
  async find(
    name: string,
    id: string
  ): Promise<(FindOrRequestResponseBaseType & { id: string })[]> {
    const foundUsers = await User.find({
      name: { $regex: name, $options: 'gi' }
    }).select('name avatar friends')

    const user = await User.findById(id).select(
      'friends requestsSent requestsReceived -_id'
    )

    const parsedFoundUsers = foundUsers
      .filter(
        foundUser =>
          foundUser.friends.findIndex(
            ({ friendId }) => friendId.toString() === foundUser._id.toString()
          ) === -1 &&
          !foundUser.requestsSent.includes(foundUser._id) &&
          !foundUser.requestsReceived.includes(foundUser._id)
      )
      .map(foundUser => {
        return {
          id: foundUser._id,
          name: foundUser.name,
          avatar: foundUser.avatar,
          mutuals: mutualFriendsCounter(foundUser, user)
        }
      })

    return parsedFoundUsers
  }

  async request(
    fromUser: IUser,
    toUser: IUser
  ): Promise<FindOrRequestResponseBaseType & { userId: string }> {
    const requestReceived = {
      userId: fromUser._id,
      name: fromUser.name,
      avatar: fromUser.avatar,
      mutuals: mutualFriendsCounter(toUser, fromUser)
    }

    toUser.requestsReceived.push(requestReceived)
    fromUser.requestsSent.push(toUser._id)
    await toUser.save()
    await fromUser.save()

    return requestReceived
  }

  async accept(user: IUser, acceptedUser: IUser): Promise<AcceptResponse> {
    const chat = new Chat()

    const friendCfg = {
      chatId: chat._id,
      isRemoved: false,
      unreadMessages: 0
    }

    acceptedUser.requestsSent = acceptedUser.requestsSent.filter(
      friendRequest => friendRequest.toString() !== user._id.toString()
    )
    acceptedUser.friends.push({
      ...friendCfg,
      friendId: user._id
    })

    user.requestsReceived = user.requestsReceived.filter(
      friendRequest =>
        friendRequest.userId.toString() !== acceptedUser._id.toString()
    )
    user.friends.push({
      ...friendCfg,
      friendId: acceptedUser._id
    })

    await chat.save()
    await user.save()
    await user.save()

    return friendCfg
  }

  async sendMessage(chatId: string, message: Message): Promise<void> {
    const chat = await Chat.findById(chatId)

    chat.messages.push(message)
    await chat.save()
  }
}

export default FriendsService
