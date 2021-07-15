import React from 'react'

import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import { UserFoundWrapper } from './styles'

type UserFoundProps = {
  avatar?: string
  name: string
  mutuals: number
}

const UserFound: React.FC<UserFoundProps> = ({
  avatar = defaultAvatarIcon,
  name,
  mutuals,
  children
}) => {
  return (
    <UserFoundWrapper>
      <img src={avatar} alt="" className="avatar" />
      <div className="info">
        <span>{name}</span>
        <p>{mutuals} mutual friends</p>
      </div>
      {children}
    </UserFoundWrapper>
  )
}

export default UserFound
