import { createSlice } from '@reduxjs/toolkit'

type FriendsSlice = {
  _id: string
  name: string
  avatar?: string
  isOnline: boolean
  socketId: string
  unreadMessages: number
  isRemoved: boolean
  chat: {
    messages: {
      content: string
      sender: string
      senderAt: number
    }[]
  }
}

type SetFriendAction = {
  type: string
  payload: FriendsSlice[]
}

type NewFriendOnlineAction = {
  type: string
  payload: {
    id: string
    socketId: string
  }
}

type NewFriendAction = {
  type: string
  payload: FriendsSlice
}

type NewMessageAction = {
  type: string
  payload: {
    content: string
    sender: string
    senderAt: number
  }
}

type RemoveOrDisconnectFriendAction = {
  type: string
  payload: {
    id: string
  }
}

const initialState: FriendsSlice[] = []

const friends = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, { payload }: SetFriendAction) {
      state = payload
    },
    newFriendOnline(state, { payload }: NewFriendOnlineAction) {
      state = state.map(friend => {
        if (friend._id === payload.id) {
          friend.socketId = payload.socketId
        }
        return friend
      })
    },
    newFriend(state, { payload }: NewFriendAction) {
      state = [...state, payload]
    },
    newMessage(state, { payload }: NewMessageAction) {
      state = state.map(friend => {
        if (friend._id === payload.sender) {
          friend.chat.messages.push(payload)
        }
        return friend
      })
    },
    removeFriend(state, { payload }: RemoveOrDisconnectFriendAction) {
      state = state.map(friend => {
        if (friend._id === payload.id) {
          friend.isRemoved = true
        }
        return friend
      })
    },
    friendDisconnected(state, { payload }: RemoveOrDisconnectFriendAction) {
      state = state.map(friend => {
        if (friend._id === payload.id) {
          friend.isOnline = false
          friend.socketId = ''
        }
        return friend
      })
    }
  }
})

export const reducer = friends.reducer
export const actions = friends.actions
