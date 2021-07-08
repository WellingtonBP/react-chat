import React from 'react'

import UserFound from '../../UserFound'
import ActionButton from '../../ActionButton'
import { Actions } from './styles'

const DUMMY_REQUESTS = [
  {
    id: 'request-1',
    name: 'Fabio Andre',
    mutuals: 4
  },
  {
    id: 'request-2',
    name: 'Roger Malaquias',
    mutuals: 0
  },
  {
    id: 'request-3',
    name: 'Fabiola Fabiana',
    mutuals: 7
  }
]

const FriendsRequests: React.FC = () => {
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
      {DUMMY_REQUESTS.map(request => (
        <UserFound
          key={request.id}
          mutuals={request.mutuals}
          name={request.name}
          actions={actions}
        />
      ))}
      {DUMMY_REQUESTS.length < 1 && <h1 id="info">No friends requests</h1>}
    </>
  )
}

export default FriendsRequests
