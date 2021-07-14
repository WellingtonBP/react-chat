type SignAndLoginResponse = {
  name: string
  avatar?: string
  requestsReceived: {
    userId: string
    name: string
    avatar?: string
    mutuals: number
  }[]
  requestsSent: string[]
  token: string
  expiresIn: number
  friends: {
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
}

export default SignAndLoginResponse
