import { Dispatch } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

import { actions as friendsActions } from '../store/friends/friendsSlice'
import { actions as userActions } from '../store/user/userSlice'

function socketListeners(socket: Socket, dispatch: Dispatch): void {
  socket.on('new_friend_online', ({ id, socket }) => {
    dispatch(friendsActions.newFriendOnline({ id, socketId: socket }))
  })

  socket.on('new_friend_request', request => {
    dispatch(userActions.newFriendRequest(request))
  })

  socket.on('accepted_friend_request', acceptedFriend => {
    const parsedAcceptedFriend = {
      unreadMessages: acceptedFriend.unreadMessages,
      isRemoved: acceptedFriend.isRemoved,
      chat: acceptedFriend.chatId,
      ...acceptedFriend.friendId
    }

    dispatch(friendsActions.newFriend(parsedAcceptedFriend))
  })

  socket.on('new_message', message => {
    dispatch(friendsActions.newMessage(message))
  })

  socket.on('removed_friend', ({ id }) => {
    dispatch(friendsActions.removeFriend(id))
  })

  socket.on('friend_disconnect', ({ id }) => {})
}

export default socketListeners
