import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import defaultAvatarIcon from '../../../../assets/images/defaultAvatarIcon.svg'
import dotsIcon from '../../../../assets/images/dotsIcon.svg'
import { FriendWrapper, FriendHeader, FriendOptions } from './styles'

const Friends: React.FC = () => {
  const [showOptions, setShowOptions] = useState(false)
  const friends = useSelector((state: RootState) => state.friends.array)

  return (
    <>
      {friends.map(friend => (
        <FriendWrapper
          id={friend._id}
          className={friend.unreadMessages !== 0 ? 'new-message' : ''}
          key={friend._id}
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
          <p>
            {friend.chat.messages[
              friend.chat.messages.length - 1
            ]?.content.substring(0, 100) || 'No message yet.'}
          </p>
        </FriendWrapper>
      ))}
      {friends.length < 1 && <h1 id="info">No friends found</h1>}
    </>
  )
}

export default Friends
