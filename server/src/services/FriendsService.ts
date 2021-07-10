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
            currentUserFriend =>
              currentUserFriend.friendId.toString() === user._id.toString()
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
            friend =>
              currentUser.friends.findIndex(
                currentUserfriend =>
                  currentUserfriend.friendId.toString() ===
                  friend.friendId.toString()
              ) !== -1
          ).length
        }
      })

    return parsedUsers
  }
}

export default FriendsService
