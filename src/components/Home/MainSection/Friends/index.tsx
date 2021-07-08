import React, { useState } from 'react'

import defaultAvatarIcon from '../../../../assets/images/defaultAvatarIcon.svg'
import dotsIcon from '../../../../assets/images/dotsIcon.svg'
import { FriendWrapper, FriendHeader, FriendOptions } from './styles'

const DUMMY_FRIENDS = [
  {
    id: 'friend-1',
    name: 'João Silva',
    avatar: null,
    isOnline: true,
    unreadMessages: 3,
    lastMessage:
      'Lorem Ipsum is simply dummy text of the printing asdsaa a adas aasdsa sda '
  },
  {
    id: 'friend-2',
    name: 'Maria Souza',
    isOnline: true,
    unreadMessages: 1,
    lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
    avatar: null
  },
  {
    id: 'friend-3',
    name: 'Andre Ferreira',
    isOnline: false,
    unreadMessages: 0,
    lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
    avatar: null
  },
  {
    id: 'friend-4',
    name: 'Adriana Soares',
    isOnline: false,
    unreadMessages: 0,
    lastMessage: 'Lorem Ipsum is simply dummy text of the printing',
    avatar: null
  }
]

const Friends: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false)
  return (
    <>
      {DUMMY_FRIENDS.map(friend => (
        <FriendWrapper
          id={friend.id}
          className={friend.unreadMessages !== 0 ? 'new-message' : ''}
          key={friend.id}
        >
          <FriendHeader>
            <div>
              <img
                src={friend.avatar ?? defaultAvatarIcon}
                alt=""
                className="friend-avatar"
              />
              <span className={friend.isOnline ? 'online' : ''}>
                {friend.name}
              </span>
            </div>
            <button
              type="button"
              aria-controls="options"
              onClick={() => setShowOptions(prev => !prev)}
            >
              <img src={dotsIcon} alt="Options" />
            </button>
            {showOptions && (
              <FriendOptions>
                <button type="button">
                  <li>Clear Messages</li>
                </button>
                <button type="button">
                  <li>Delete Friend</li>
                </button>
              </FriendOptions>
            )}
          </FriendHeader>
          <p>{friend.lastMessage.substring(0, 100)}</p>
        </FriendWrapper>
      ))}
      {DUMMY_FRIENDS.length < 1 && <h1 id="info">No friends found</h1>}
    </>
  )
}

export default Friends
