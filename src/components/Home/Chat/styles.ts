import styled from 'styled-components'

const ChatContainer = styled.section`
  height: 100%;
  display: none;
  &.chatting {
    display: block;
  }

  @media (min-width: 768px) {
    display: block;
    flex: 1;
    &.no-chatting {
      border-radius: 0 0.5rem 0.5rem 0;
      background-color: var(--lightGrayishBlue);
      display: flex;
      align-items: center;
      justify-content: center;
      h1 {
        font-size: 2rem;
        font-weight: normal;
        word-spacing: 0.3rem;
        letter-spacing: 0.1rem;
      }
    }
  }
`

const ChatHeader = styled.header`
  background-color: var(--dark);
  display: flex;
  align-items: center;
  height: 6rem;
  padding: 0 1.5rem;
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
  div {
    margin: 0 auto;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
    }
    span {
      font-size: 1.6rem;
      color: white;
      &.online::after {
        content: '';
        display: inline-block;
        width: 1rem;
        height: 1rem;
        margin-left: 1rem;
        background-color: var(--darkGreen);
        border-radius: 50%;
      }
    }
  }
  @media (min-width: 768px) {
    border-top-right-radius: 0.5rem;
    button {
      display: none;
    }
  }
`

const Messages = styled.section`
  height: calc(100% - 12rem);
  background-color: var(--lightGrayishBlue);
  overflow-y: auto;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) {
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: var(--lightGrayishBlue);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--dark);
      border-radius: 1rem;
      border: 2px solid var(--lightGrayishBlue);
    }
  }
`

const Message = styled.article`
  max-width: 50%;

  &.send {
    align-self: flex-end;
    div {
      border-radius: 0.8rem 0 0.8rem 0.8rem;
    }
    span {
      text-align: right;
    }
  }
  &.received {
    align-self: flex-start;
    div {
      border-radius: 0 0.8rem 0.8rem 0.8rem;
    }
  }

  div {
    color: white;
    padding: 1rem;
    font-size: 1.5rem;
    background-color: var(--dark);
  }
  span {
    display: inline-block;
    width: 100%;
    margin-top: 0.4rem;
    font-size: 1.3rem;
  }
`

const SendMessageForm = styled.form`
  background-color: var(--dark);
  height: 6rem;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    background-color: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 80%;
    font-size: 1.5rem;
    color: white;
    &::placeholder {
      color: white;
    }
  }
  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    img {
      width: 6rem;
    }
  }
  @media (min-width: 768px) {
    border-bottom-right-radius: 0.5rem;
  }
`

export { ChatContainer, ChatHeader, Messages, Message, SendMessageForm }
