import { Schema, model, Types, Document, ObjectId } from 'mongoose'

import { IChat } from './Chat'

export interface IUser extends Document {
  socketId?: string
  name: string
  email: string
  password: string
  avatar?: string
  isOnline: boolean
  requestsReceived: Array<{
    userId: ObjectId
    name: string
    avatar?: string
    mutuals: number
  }>
  requestsSent: Array<ObjectId>
  friends: Array<{
    friendId: ObjectId | IUser
    unreadMessages: number
    isRemoved: boolean
    cleanedAt?: number
    chatId: ObjectId | IChat
  }>
}

const userSchema = new Schema<IUser>({
  socketId: String,
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: String,
  isOnline: {
    type: Boolean,
    required: true,
    default: false
  },
  requestsReceived: [
    {
      userId: {
        type: Types.ObjectId,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: String,
      mutuals: {
        type: Number,
        required: true,
        default: 0
      }
    }
  ],
  requestsSent: [
    {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  friends: [
    {
      friendId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
      },
      unreadMessages: {
        type: Number,
        required: true,
        default: 0
      },
      isRemoved: {
        type: Boolean,
        required: true,
        default: false
      },
      cleanedAt: Number,
      chatId: {
        type: Types.ObjectId,
        ref: 'Chat',
        required: true
      }
    }
  ]
})

export default model<IUser>('User', userSchema)
