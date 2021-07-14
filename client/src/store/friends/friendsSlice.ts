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
}[]

type SetFriendAction = {
  type: string
  payload: FriendsSlice
}

const initialState: FriendsSlice = []

const friends = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends(state, { payload }: SetFriendAction) {
      state = payload
    }
  }
})

export const reducer = friends.reducer
export const actions = friends.actions
