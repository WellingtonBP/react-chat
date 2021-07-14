import { Dispatch } from '@reduxjs/toolkit'
import { Socket } from 'socket.io-client'

function socketListeners(socket: Socket, dispatch: Dispatch): void {
  socket.on('new_friend_online', ({ id, socket }) => {})

  socket.on('new_friend_request', request => {})

  socket.on('accepted_friend_request', acceptedFriend => {})

  socket.on('new_message', message => {})

  socket.on('removed_friend', ({ id }) => {})

  socket.on('friend_disconnect', ({ id }) => {})
}

export default socketListeners
