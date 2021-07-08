import React, { ReactNode } from 'react'

import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import { UserFoundWrapper } from './styles'

type UserFoundProps = {
  avatar?: string
  name: string
  mutuals: number
  actions: ReactNode
}

const UserFound: React.FC<UserFoundProps> = ({
  avatar = defaultAvatarIcon,
  name,
  mutuals,
  actions
}) => {
  return (
    <UserFoundWrapper>
      <img src={avatar} alt="" className="avatar" />
      <div className="info">
        <span>{name}</span>
        <p>{mutuals} mutual friends</p>
      </div>
      {actions}
    </UserFoundWrapper>
  )
}

export default UserFound
