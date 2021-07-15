import { Dispatch } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

import { setUnreadMessages } from './api'
import { actions as friendsActions } from '../store/friends/friendsSlice'
import { actions as userActions } from '../store/user/userSlice'
import store from '../store'

export type AcceptedFriendSocket = {
  unreadMessages: number
  chatId: {
    messages: {
      sender: string
      senderAt: number
      content: string
    }[]
  }
  friendId: {
    _id: string
    name: string
    avatar?: string
    isOnline: boolean
    socketId: string
  }
}

function socketListeners(socket: Socket, dispatch: Dispatch): void {
  socket.on('new_friend_online', ({ id, socket }) => {
    dispatch(friendsActions.newFriendOnline({ id, socketId: socket }))
  })

  socket.on('new_friend_request', request => {
    dispatch(userActions.newFriendRequest(request))
  })

  socket.on(
    'accepted_friend_request',
    (acceptedFriend: AcceptedFriendSocket) => {
      const parsedAcceptedFriend = {
        unreadMessages: acceptedFriend.unreadMessages,
        chat: acceptedFriend.chatId,
        ...acceptedFriend.friendId
      }

      dispatch(friendsActions.newFriend(parsedAcceptedFriend))
      alert(`${parsedAcceptedFriend.name} accepted your request`)
    }
  )

  socket.on('new_message', message => {
    dispatch(friendsActions.newMessage(message))
    if (store.getState().user.chattingWith !== message.sender) {
      dispatch(
        friendsActions.setUnreadMessages({ id: message.sender, reset: false })
      )
      setUnreadMessages(store.getState().auth.token, message.sender)
    }
  })

  socket.on('removed_friend', ({ id }) => {
    dispatch(friendsActions.removeFriend({ id }))
  })

  socket.on('friend_disconnect', id => {
    dispatch(friendsActions.friendDisconnected(id))
  })
}

export default socketListeners
