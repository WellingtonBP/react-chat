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
  } else if ((a.isOnline && b.isOnline) || (!a.isOnline && !b.isOnline)) {
    if (a.unreadMessages && !b.unreadMessages) {
      return -1
    } else if (!a.unreadMessages && !b.unreadMessages) {
      return 0
    }
  }
}

const Friends: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const friends = useSelector((state: RootState) => state.friends.array)
  const [showOptions, setShowOptions] = useState<boolean[]>(
    new Array(friends.length)
  )
  const token = useSelector((state: RootState) => state.auth.token)
  const socket = useSelector((state: RootState) => state.user.socket)

  const startChat = (friendId: string) => {
    dispatch(userActions.startChat({ id: friendId }))
    if (friends.find(friend => friend._id === friendId).unreadMessages > 0) {
      dispatch(friendsActions.setUnreadMessages({ id: friendId, reset: true }))
      setUnreadMessages(token, friendId, true)
    }
  }

  const removeFriend = (friendId: string) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this friend?'
    )
    if (confirmation) {
      dispatch(userActions.stopChat())
      socket.emit('remove_friend', { id: friendId })
      dispatch(friendsActions.removeFriend({ id: friendId }))
    }
  }

  return (
    <>
      {[...friends].sort(sortFriends).map((friend, index) => (
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
              onClick={evt => {
                evt.stopPropagation()
                setShowOptions(prev => {
                  const updateShowArray = [...prev]
                  updateShowArray[index] = !updateShowArray[index]
                  return updateShowArray
                })
              }}
            >
              <img src={dotsIcon} alt="Options" />
            </button>
            {showOptions[index] && (
              <FriendOptions>
                <button type="button">
                  <li>Clear Messages</li>
                </button>
                <button
                  type="button"
                  onClick={evt => {
                    evt.stopPropagation()
                    removeFriend(friend._id)
                  }}
                >
                  <li>Remove Friend</li>
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
