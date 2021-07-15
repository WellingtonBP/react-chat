import { createSlice } from '@reduxjs/toolkit'

type UserSlice = {
  id: string
  name: string
  avatar?: string
  requestsReceived: {
    userId: string
    name: string
    avatar?: string
    mutuals: number
  }[]
  socket: any
  chattingWith?: string
}

type SetUserAction = {
  type: string
  payload: UserSlice
}

type NewFriendRequest = {
  type: string
  payload: {
    userId: string
    name: string
    avatar?: string
    mutuals: number
  }
}

type StartChatAction = {
  type: string
  payload: {
    id: string
  }
}

type AcceptFriendAction = StartChatAction

const initialState: UserSlice = {
  id: '',
  name: '',
  avatar: null,
  requestsReceived: [],
  socket: null,
  chattingWith: null
}

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: SetUserAction) {
      state.id = payload.id
      state.name = payload.name
      state.avatar = payload.avatar
      state.requestsReceived = payload.requestsReceived
      state.socket = payload.socket
    },
    resetUser(state) {
      state.socket.close()
      state.id = ''
      state.name = ''
      state.avatar = null
      state.requestsReceived = []
      state.socket = null
      state.chattingWith = null
    },
    newFriendRequest(state, { payload }: NewFriendRequest) {
      state.requestsReceived = [...state.requestsReceived, payload]
    },
    startChat(state, { payload }: StartChatAction) {
      state.chattingWith = payload.id
    },
    stopChat(state) {
      state.chattingWith = null
    },
    acceptFriend(state, { payload }: AcceptFriendAction) {
      state.requestsReceived = state.requestsReceived.filter(
        request => request.userId !== payload.id
      )
    }
  }
})

export const reducer = user.reducer
export const actions = user.actions
