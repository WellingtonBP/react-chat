const api = process.env.REACT_APP_API_HOST

export type FindResponse = {
  id: string
  name: string
  avatar?: string
  mutuals: number
}

export type Token = {
  token: string
  expiresIn: number
}

async function sign(
  name: string,
  email: string,
  password: string
): Promise<Token | never> {
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

  return data
}

async function login(email: string, password: string): Promise<Token | never> {
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

  return data
}

async function find(
  name: string,
  token: string
): Promise<FindResponse[] | never> {
  const response = await fetch(`${api}/friends/find?name=${name}`, {
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

async function setUnreadMessages(
  token: string,
  friendId: string,
  reset = false
): Promise<void> {
  const response = await fetch(`${api}/friends/set-unread-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      friendId,
      reset
    })
  })

  if (!response.ok) throw new Error('Something went wrong')
}

async function clearChat(
  token: string,
  friendId: string,
  date: number
): Promise<void> {
  const response = await fetch(`${api}/friends/clear-chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      friendId,
      date
    })
  })

  if (!response.ok) throw new Error('Something went wrong')
}

async function uploadAvatar(
  token: string,
  data: FormData
): Promise<string | never> {
  const response = await fetch(`${api}/users/change-avatar`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: data
  })

  if (!response.ok) throw new Error('Something went wrong')

  const { avatar } = await response.json()

  return avatar
}

export { sign, login, find, setUnreadMessages, clearChat, uploadAvatar }
