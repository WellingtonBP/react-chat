import { Schema, model, Types, Document, ObjectId } from 'mongoose'

export interface IChat extends Document {
  messages: Array<{
    content: string
    sender: ObjectId
    senderAt: number
  }>
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
