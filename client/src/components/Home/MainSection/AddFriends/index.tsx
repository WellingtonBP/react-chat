import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../../../../store'
import { find } from '../../../../services/api'
import FindResponse from '../../../../types/FindResponse'
import searchIcon from '../../../../assets/images/searchIcon.svg'
import UserFound from '../../UserFound'
import ActionButton from '../../ActionButton'
import { SearchForm } from './styles'

const AddFriends: React.FC = () => {
  const [search, setSearch] = useState('')
  const [foundUsers, setFoundUsers] = useState<FindResponse[]>([])
  const token = useSelector((state: RootState) => state.auth.token)

  useEffect(() => {
    const fetchUsers = async () => {
      const foundUsers = search !== '' ? await find(search, token) : []
      setFoundUsers(foundUsers)
    }
    const fetchTimeout = setTimeout(() => fetchUsers(), 600)

    return () => clearTimeout(fetchTimeout)
  }, [search, token])

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
        <UserFound
          name={user.name}
          key={user.id}
          mutuals={user.mutuals}
          actions={
            <ActionButton background="var(--darkBlue)">Add</ActionButton>
          }
        />
      ))}
      {foundUsers.length < 1 && <h1 id="info">No users found</h1>}
    </>
  )
}

export default AddFriends
