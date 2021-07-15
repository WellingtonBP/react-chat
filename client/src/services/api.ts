const api = process.env.REACT_APP_API_HOST

export type FindResponse = {
  id: string
  name: string
  avatar?: string
  mutuals: number
}

export type SignResponse = {
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

export type LoginResponse = SignResponse

async function sign(
  name: string,
  email: string,
  password: string
): Promise<SignResponse | never> {
  const response = await fetch(`${api}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    const errMessage = data.info?.email?.msgs?.[0] || 'Something went wrong!'
    throw new Error(errMessage)
  }

  data.friends = data.friends.map(friend => ({
    ...friend.friendId,
    unreadMessages: friend.unreadMessages,
    isRemoved: friend.isRemoved,
    chat: { ...friend.chatId }
  }))

  return data
}

async function login(
  email: string,
  password: string
): Promise<LoginResponse | never> {
  const response = await fetch(`${api}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  const data = await response.json()

  if (!response.ok) {
    const errMessage = data.error || 'Something went wrong!'
    throw new Error(errMessage)
  }

  data.friends = data.friends.map(friend => ({
    ...friend.friendId,
    unreadMessages: friend.unreadMessages,
    isRemoved: friend.isRemoved,
    chat: { ...friend.chatId }
  }))

  return data
}

async function find(
  name: string,
  token: string
): Promise<FindResponse[] | never> {
  const response = await fetch(`${api}/friends/find?name=${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })

  const data = await response.json()

  if (!response.ok) {
    const errMessage = data.error || 'Something went wrong!'
    throw new Error(errMessage)
  }

  return data
}

export { sign, login, find }
