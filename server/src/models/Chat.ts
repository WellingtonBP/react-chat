import { Schema, model, Types, Document, ObjectId } from 'mongoose'

export type Message = {
  content: string
  sender: ObjectId
  senderAt: number
}

export interface IChat extends Document {
  messages: Array<Message>
}

const chatSchema = new Schema({
  messages: [
    {
      content: {
        type: String,
        required: true
      },
      sender: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
      },
      senderAt: {
        type: Number,
        required: true
      }
    }
  ]
})

export default model<IChat>('Chat', chatSchema)
