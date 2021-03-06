import Chat, { IChat, Message } from '../models/Chat'
import User, { IUser } from '../models/User'

type FindOrRequestResponseBaseType = {
  name: string
  avatar?: string
  mutuals: number
}

type AcceptResponse = {
  unreadMessages: number
  isRemoved: boolean
  chatId: IChat
}

function mutualFriendsCounter(user1: IUser, user2: IUser): number {
  return user1.friends.filter(
    ({ friendId }) =>
      user2.friends.findIndex(
        ({ friendId: user2FriendId }) =>
          user2FriendId.toString() === friendId.toString()
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
    }).select('name avatar friends requestsSent requestsReceived')

    const user = await User.findById(id).select(
      'friends requestsSent requestsReceived _id'
    )

    const parsedFoundUsers = foundUsers
      .filter(
        foundUser =>
          user.friends.findIndex(
            ({ friendId }) => friendId.toString() === foundUser._id.toString()
          ) === -1 &&
          !user.requestsSent.includes(foundUser._id) &&
          !user.requestsReceived.includes(foundUser._id) &&
          user._id.toString() !== foundUser._id.toString()
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
    await acceptedUser.save()

    return { ...friendCfg, chatId: chat }
  }

  async remove(user: IUser, removedUser: IUser): Promise<void> {
    const chatId = user.friends.find(
      friend => friend.friendId.toString() === removedUser._id.toString()
    ).chatId
    user.friends = user.friends.filter(
      friend => friend.friendId.toString() !== removedUser._id.toString()
    )
    removedUser.friends = removedUser.friends.filter(
      friend => friend.friendId.toString() !== user._id.toString()
    )

    await Chat.deleteOne({ _id: chatId })
    await user.save()
    await removedUser.save()
  }

  async clearChat(user: IUser, friendId: string, date: number): Promise<void> {
    user.friends = user.friends.map(friend => {
      if (friend.friendId.toString() === friendId) {
        friend.cleanedAt = date
      }
      return friend
    })

    await user.save()
  }

  async sendMessage(
    chatId: string,
    message: Message,
    toUser: IUser
  ): Promise<void> {
    const chat = await Chat.findById(chatId)

    if (!toUser.isOnline) {
      toUser.friends.map(friend => {
        if (friend.chatId.toString() === chatId) {
          friend.unreadMessages++
        }
        return friend
      })
      await toUser.save()
    }

    chat.messages.push(message)
    await chat.save()
  }

  async setUnreadMessages(userId: string, friendId: string, reset: boolean) {
    const user = await User.findById(userId)

    user.friends = user.friends.map(friend => {
      if (friend.friendId.toString() === friendId) {
        friend.unreadMessages = reset ? 0 : friend.unreadMessages + 1
      }
      return friend
    })

    await user.save()
  }
}

export default FriendsService
