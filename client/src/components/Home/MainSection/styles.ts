import styled from 'styled-components'

const MainSectionContainer = styled.section`
  height: 100%;
  nav {
    height: 7rem;
    background-color: var(--dark);
  }
  &.chatting {
    display: none;
  }

  @media (min-width: 768px) {
    &.chatting {
      display: block;
    }
    flex: 1;
    nav {
      border-top-left-radius: 0.5rem;
    }
  }
`

const Header = styled.header`
  background-color: var(--dark);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 7rem;
  padding: 0 1.5rem;
  #profile-button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    color: white;
    font-size: 1.6rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      margin-right: 1.3rem;
    }
  }
  #logout-button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    img {
      width: 3rem;
    }
  }

  @media (min-width: 768px) {
    height: auto;
    background-color: transparent;
    position: absolute;
    width: 100%;
    top: -6rem;
  }
`

const NavList = styled.ul`
  width: 100%;
  height: 100%;
  list-style: none;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const NavItem = styled.li`
  a {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    text-decoration: none;
    &.active {
      border-bottom: 1px solid white;
    }
    span {
      margin-left: 1rem;
      display: none;
      color: white;
      font-size: 1.5rem;
    }
    img {
      height: 2.7rem;
    }
  }
  position: relative;
  &::after {
    position: absolute;
    color: var(--lightGrayishBlue);
    font-weight: bold;
    font-size: 1.1rem;
    top: -0.8rem;
  }
  &.unread-messages::after {
    content: attr(data-messages);
    right: -1.5rem;
  }
  &.new-requests::after {
    content: attr(data-requests);
    right: -1.2rem;
  }

  @media (min-width: 576px) {
    a span {
      display: block;
    }
  }
  @media (min-width: 768px) {
    a span {
      display: none;
    }
  }
  @media (min-width: 1200px) {
    a span {
      display: block;
    }
  }
`

const MainSectionContent = styled.div`
  background-color: var(--dark);
  height: calc(100% - 140px);
  padding: 1rem 1.5rem;
  overflow: auto;
  #info {
    font-size: 1.6rem;
    color: white;
    text-align: center;
    margin-top: 3rem;
  }

  @media (min-width: 768px) {
    height: calc(100% - 70px);
    border-bottom-left-radius: 0.5rem;
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: var(--dark);
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--lightGrayishBlue);
      border-radius: 1rem;
      border: 2px solid var(--dark);
    }
  }
`

export { MainSectionContainer, Header, NavList, NavItem, MainSectionContent }
