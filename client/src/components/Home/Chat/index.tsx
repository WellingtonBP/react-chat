import React, { FormEvent, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../../store'
import { actions as friendsActions } from '../../../store/friends/friendsSlice'
import { actions as userActions } from '../../../store/user/userSlice'
import backArrowIcon from '../../../assets/images/backArrowIcon.svg'
import sendMessageIcon from '../../../assets/images/sendMessageIcon.svg'
import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import {
  ChatContainer,
  ChatHeader,
  Messages,
  Message,
  SendMessageForm
} from './styles'

const apiHost = process.env.REACT_APP_API_HOST

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {
    chattingWith,
    socket,
    id: userId
  } = useSelector((state: RootState) => state.user)
  const friend = useSelector((state: RootState) =>
    state.friends.array.find(friend => friend._id === chattingWith)
  )
  const [message, setMessage] = useState('')

  const sendMessageHandler = (evt: FormEvent) => {
    evt.preventDefault()
    if (message.trim() === '') return

    const messageObj = {
      content: message,
      senderAt: Date.now(),
      id: friend._id
    }
    socket.emit('send_message', messageObj)

    dispatch(
      friendsActions.newMessage({
        id: friend._id,
        content: messageObj.content,
        sender: userId,
        senderAt: messageObj.senderAt
      })
    )

    setMessage('')
  }

  return (
    <ChatContainer className={!!chattingWith ? 'chatting' : 'no-chatting'}>
      {!!chattingWith && (
        <>
          <ChatHeader>
            <button
              type="button"
              onClick={() => dispatch(userActions.stopChat())}
            >
              <img src={backArrowIcon} alt="Back" />
            </button>
            <div>
              <img
                src={
                  friend.avatar
                    ? `${apiHost}/${friend.avatar}`
                    : defaultAvatarIcon
                }
                alt=""
                id="avatar"
              />
              <span className={friend.isOnline ? 'online' : ''}>
                {friend.name}
              </span>
            </div>
          </ChatHeader>
          <Messages>
            {friend.chat.messages.map(message => (
              <Message
                key={message.senderAt}
                className={message.sender === friend._id ? 'received' : 'send'}
              >
                <div>{message.content}</div>
                <span>
                  {new Date(message.senderAt)
                    .toLocaleTimeString('pt-BR')
                    .substr(0, 5)}
                </span>
              </Message>
            ))}
          </Messages>
          <SendMessageForm onSubmit={sendMessageHandler}>
            <input
              type="text"
              placeholder="Type a message:"
              autoFocus
              value={message}
              onChange={evt => setMessage(evt.target.value)}
            />
            <button type="submit">
              <img src={sendMessageIcon} alt="Send Message" />
            </button>
          </SendMessageForm>
        </>
      )}
      {!chattingWith && <h1>Select someone to start chat</h1>}
    </ChatContainer>
  )
}

export default Chat
