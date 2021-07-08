import React from 'react'

import searchIcon from '../../../../assets/images/searchIcon.svg'
import UserFound from '../../UserFound'
import ActionButton from '../../ActionButton'
import { SearchForm } from './styles'

const DUMMY_FOUND_USERS = [
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

const AddFriends: React.FC = () => {
  return (
    <>
      <SearchForm>
        <input type="text" placeholder="Search" title="Search Friends" />
        <img src={searchIcon} alt="" />
      </SearchForm>
      {DUMMY_FOUND_USERS.map(user => (
        <UserFound
          name={user.name}
          key={user.id}
          mutuals={user.mutuals}
          actions={
            <ActionButton background="var(--darkBlue)">Add</ActionButton>
          }
        />
      ))}
      {DUMMY_FOUND_USERS.length < 1 && <h1 id="info">No users found</h1>}
    </>
  )
}

export default AddFriends
