import React from 'react'

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

const Chat: React.FC<{ isChatting: boolean }> = ({ isChatting }) => {
  return (
    <ChatContainer className={isChatting ? 'chatting' : 'no-chatting'}>
      {isChatting && (
        <>
          <ChatHeader>
            <button type="button">
              <img src={backArrowIcon} alt="Back" />
            </button>
            <div>
              <img src={defaultAvatarIcon} alt="" id="avatar" />
              <span className="online">João Silva</span>
            </div>
          </ChatHeader>
          <Messages>
            <Message className="received">
              <div>Eae meu man</div>
              <span>18:47</span>
            </Message>
            <Message className="send">
              <div>Como vai</div>
              <span>18:47</span>
            </Message>
          </Messages>
          <SendMessageForm>
            <input type="text" placeholder="Type a message:" autoFocus />
            <button type="submit">
              <img src={sendMessageIcon} alt="Send Message" />
            </button>
          </SendMessageForm>
        </>
      )}
      {!isChatting && <h1>Select someone to start chat</h1>}
    </ChatContainer>
  )
}

export default Chat
