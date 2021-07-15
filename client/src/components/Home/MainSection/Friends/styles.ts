import styled from 'styled-components'

const FriendWrapper = styled.article`
  cursor: pointer;
  background-color: var(--lightGrayishBlue);
  border-radius: 0.5rem;
  padding: 1rem 1.5rem;

  &.new-message {
    background-color: var(--darkGrayishBlue);
  }
  & + & {
    margin-top: 1.2rem;
  }

  p {
    font-size: 1.4rem;
    color: var(--dark);
    filter: brightness(2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    p {
      white-space: normal;
    }
  }
`

const FriendHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  position: relative;

  div {
    display: flex;
    align-items: center;
    gap: 2rem;
    .friend-avatar {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
    }
    span {
      font-size: 1.6rem;
      word-spacing: 0.2rem;
      &.online::after {
        content: '';
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        margin-left: 1rem;
        display: inline-block;
        background-color: var(--green);
      }
    }
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding-left: 1rem;
  }

  ul button {
    padding: 0;
    &:hover li {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`

const FriendOptions = styled.ul`
  z-index: 1;
  position: absolute;
  right: 1.5rem;
  top: 2.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  list-style: none;
  background-color: var(--dark);
  filter: brightness(1.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  li {
    color: white;
    font-size: 1.3rem;
    padding: 0.5rem;
  }
`

export { FriendWrapper, FriendHeader, FriendOptions }
