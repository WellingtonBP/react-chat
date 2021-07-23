import React from 'react'

import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import { UserFoundWrapper } from './styles'

const apiHost = process.env.REACT_APP_API_HOST

type UserFoundProps = {
  avatar?: string
  name: string
  mutuals: number
}

const UserFound: React.FC<UserFoundProps> = ({
  avatar,
  name,
  mutuals,
  children
}) => {
  return (
    <UserFoundWrapper>
      <img
        src={avatar ? `${apiHost}/${avatar}` : defaultAvatarIcon}
        alt=""
        className="avatar"
      />
      <div className="info">
        <span>{name}</span>
        <p>{mutuals} mutual friends</p>
      </div>
      {children}
    </UserFoundWrapper>
  )
}

export default UserFound
