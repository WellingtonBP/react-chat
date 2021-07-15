import React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import UserFound from '../../UserFound'
import ActionButton from '../../ActionButton'
import { Actions } from './styles'

const FriendsRequests: React.FC = () => {
  const friendsRequest = useSelector(
    (state: RootState) => state.user.requestsReceived
  )
  const socket = useSelector((state: RootState) => state.user.socket)

  const acceptFriendHandler = (id: string) => {
    const confirmation = window.confirm(
      'Are you sure you want to accept this friend?'
    )
    if (confirmation) {
      socket.emit('accept_friend_request', { id })
      alert('Friend accepted!')
    }
  }

  return (
    <>
      {friendsRequest.map(request => (
        <UserFound
          avatar={request.avatar}
          key={request.userId}
          mutuals={request.mutuals}
          name={request.name}
        >
          <Actions>
            <ActionButton
              type="button"
              background="var(--darkGreen)"
              onClick={acceptFriendHandler.bind(null, request.userId)}
            >
              Accept
            </ActionButton>
            <ActionButton type="button" background="var(--red)">
              Remove
            </ActionButton>
          </Actions>
        </UserFound>
      ))}
      {friendsRequest.length < 1 && (
        <h1 id="info">No friends requests found</h1>
      )}
    </>
  )
}

export default FriendsRequests
