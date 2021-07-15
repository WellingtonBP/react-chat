import { createSlice } from '@reduxjs/toolkit'

export type FriendsSlice = {
  _id: string
  name: string
  avatar?: string
  isOnline: boolean
  socketId: string
  unreadMessages: number
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
    id?: string
    content: string
    sender: string
    senderAt: number
  }
}

type RemoveFriendAction = {
  type: string
  payload: {
    id: string
  }
}

type SetUnreadMessagesAction = {
  type: string
  payload: {
    id: string
    reset: boolean
  }
}

type DisconnectFriendAction = {
  type: string
  payload: {
    id: string
  }
}

const initialState = {
  array: [] as FriendsSlice[]
}

const friends = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, { payload }: SetFriendAction) {
      state.array = payload
    },
    resetFriends(state) {
      state.array = []
    },
    newFriendOnline(state, { payload }: NewFriendOnlineAction) {
      state.array = state.array.map(friend => {
        if (friend._id === payload.id) {
          friend.socketId = payload.socketId
          friend.isOnline = true
        }
        return friend
      })
    },
    newFriend(state, { payload }: NewFriendAction) {
      state.array.push(payload)
    },
    newMessage(state, { payload }: NewMessageAction) {
      state.array = state.array.map(friend => {
        if (friend._id === (payload.id || payload.sender)) {
          friend.chat.messages.push({
            content: payload.content,
            sender: payload.sender,
            senderAt: payload.senderAt
          })
        }
        return friend
      })
    },
    setUnreadMessages(state, { payload }: SetUnreadMessagesAction) {
      state.array = state.array.map(friend => {
        if (friend._id === payload.id) {
          friend.unreadMessages = payload.reset ? 0 : friend.unreadMessages + 1
        }
        return friend
      })
    },
    removeFriend(state, { payload }: RemoveFriendAction) {
      state.array = state.array.filter(friend => friend._id !== payload.id)
    },
    friendDisconnected(state, { payload }: DisconnectFriendAction) {
      state.array = state.array.map(friend => {
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
