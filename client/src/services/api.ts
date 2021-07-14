import SignAndLoginResponse from '../types/SignAndLoginResponse'

const api = process.env.REACT_APP_API_HOST

async function sign(
  name: string,
  email: string,
  password: string
): Promise<SignAndLoginResponse | never> {
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
): Promise<SignAndLoginResponse | never> {
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

export { sign, login }
