import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import { find, FindResponse } from '../../../../services/api'
import searchIcon from '../../../../assets/images/searchIcon.svg'
import UserFound from '../../UserFound'
import ActionButton from '../../ActionButton'
import { SearchForm } from './styles'

const AddFriends: React.FC = () => {
  const [search, setSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState<FindResponse[]>([])
  const token = useSelector((state: RootState) => state.auth.token)
  const socket = useSelector((state: RootState) => state.user.socket)

  useEffect(() => {
    const fetchUsers = async () => {
      const foundUsers = search !== '' ? await find(search, token) : []
      setFoundUsers(foundUsers)
    }
    const fetchTimeout = setTimeout(() => fetchUsers(), 600)

    return () => clearTimeout(fetchTimeout)
  }, [search, token])

  const addFriendHandler = (id: string) => {
    const confirmation = window.confirm(
      'Are you sure you want to add this user to your friends?'
    )

    if (confirmation) {
      socket.emit('send_friend_request', { id })
      setFoundUsers(prev => prev.filter(user => user.id !== id))
    }
  }

  return (
    <>
      <SearchForm>
        <input
          type="text"
          placeholder="Search"
          title="Search Friends"
          value={search}
          onChange={evt => setSearch(evt.target.value)}
        />
        <img src={searchIcon} alt="" />
      </SearchForm>
      {foundUsers.map(user => (
        <UserFound name={user.name} key={user.id} mutuals={user.mutuals}>
          <ActionButton
            background="var(--darkBlue)"
            onClick={addFriendHandler.bind(null, user.id)}
          >
            Add
          </ActionButton>
        </UserFound>
      ))}
      {foundUsers.length < 1 && <h1 id="info">No users found</h1>}
    </>
  )
}

export default AddFriends
