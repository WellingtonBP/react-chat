import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setUnreadMessages } from '../../../../services/api'
import { RootState, AppDispatch } from '../../../../store'
import { actions as userActions } from '../../../../store/user/userSlice'
import {
  actions as friendsActions,
  FriendsSlice
} from '../../../../store/friends/friendsSlice'
import defaultAvatarIcon from '../../../../assets/images/defaultAvatarIcon.svg'
import dotsIcon from '../../../../assets/images/dotsIcon.svg'
import { FriendWrapper, FriendHeader, FriendOptions } from './styles'

const sortFriends = (a: FriendsSlice, b: FriendsSlice) => {
  if (a.isOnline && !b.isOnline) {
    return -1
  } else if (a.isOnline && b.isOnline) {
    if (a.unreadMessages && !b.unreadMessages) {
      return -1
    } else if (!a.unreadMessages && !b.unreadMessages) {
      return 0
    }
  } else if (!a.isOnline && !b.isOnline) {
    if (a.unreadMessages && !b.unreadMessages) {
      return -1
    } else if (!a.unreadMessages && !b.unreadMessages) {
      return 0
    }
  }
}

const Friends: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [showOptions, setShowOptions] = useState(false)
  const friends = useSelector((state: RootState) => state.friends.array)
  const token = useSelector((state: RootState) => state.auth.token)

  const startChat = async (friendId: string) => {
    dispatch(userActions.startChat({ id: friendId }))
    if (friends.find(friend => friend._id === friendId).unreadMessages > 0) {
      dispatch(friendsActions.setUnreadMessages({ id: friendId, reset: true }))
      await setUnreadMessages(token, friendId, true)
    }
  }

  return (
    <>
      {[...friends].sort(sortFriends).map(friend => (
        <FriendWrapper
          id={friend._id}
          className={friend.unreadMessages !== 0 ? 'new-message' : ''}
          key={friend._id}
          aria-label={`Click to chat with ${friend.name}`}
          onClick={startChat.bind(null, friend._id)}
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

export default React.memo(Friends)
