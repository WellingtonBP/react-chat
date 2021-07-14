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

  const actions = (
    <Actions>
      <ActionButton type="button" background="var(--darkGreen)">
        Accept
      </ActionButton>
      <ActionButton type="button" background="var(--red)">
        Remove
      </ActionButton>
    </Actions>
  )
  return (
    <>
      {friendsRequest.map(request => (
        <UserFound
          avatar={request.avatar}
          key={request.userId}
          mutuals={request.mutuals}
          name={request.name}
          actions={actions}
        />
      ))}
      {friendsRequest.length < 1 && (
        <h1 id="info">No friends requests found</h1>
      )}
    </>
  )
}

export default FriendsRequests
