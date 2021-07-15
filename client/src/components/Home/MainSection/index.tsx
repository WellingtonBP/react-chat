import React, { Suspense, lazy } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '../../../store'
import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import logoutIcon from '../../../assets/images/logoutIcon.svg'
import messagesIcon from '../../../assets/images/messagesIcon.svg'
import friendsReqIcon from '../../../assets/images/friedsReqIcon.svg'
import addFriendsIcon from '../../../assets/images/addFriendsIcon.svg'
import Spinner from '../../../components/Spinner'

import {
  MainSectionContainer,
  Header,
  NavList,
  NavItem,
  MainSectionContent
} from './styles'

const AddFriends = lazy(() => import('./AddFriends'))
const FriendsRequests = lazy(() => import('./FriendsRequests'))
const Friends = lazy(() => import('./Friends'))

const MainSection: React.FC = () => {
  const user = useSelector((state: RootState) => state.user)

  return (
    <MainSectionContainer className={!!user.chattingWith ? 'chatting' : ''}>
      <Header>
        <button id="profile-button">
          <img src={user.avatar ?? defaultAvatarIcon} alt="avatar" />
          {user.name}
        </button>
        <button id="logout-button" type="button">
          <img src={logoutIcon} alt="Logout" />
        </button>
      </Header>
      <nav>
        <NavList>
          <NavItem>
            <NavLink to="/" exact activeClassName="active">
              <img src={messagesIcon} alt="MessagesIcon" />
              <span>Messages</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/requests" activeClassName="active">
              <img src={friendsReqIcon} alt="Frieds Requests Icon" />
              <span>Friends Requests</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/add-friends" activeClassName="active">
              <img src={addFriendsIcon} alt="Add Frieds Icon" />
              <span>Add Friends</span>
            </NavLink>
          </NavItem>
        </NavList>
      </nav>
      <MainSectionContent>
        <Suspense fallback={<Spinner />}>
          <Switch>
            <Route path="/" exact component={Friends} />
            <Route path="/requests" component={FriendsRequests} />
            <Route path="/add-friends" component={AddFriends} />
          </Switch>
        </Suspense>
      </MainSectionContent>
    </MainSectionContainer>
  )
}

export default MainSection
