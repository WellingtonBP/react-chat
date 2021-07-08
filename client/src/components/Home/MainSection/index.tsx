import React from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'

import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import logoutIcon from '../../../assets/images/logoutIcon.svg'
import messagesIcon from '../../../assets/images/messagesIcon.svg'
import friendsReqIcon from '../../../assets/images/friedsReqIcon.svg'
import addFriendsIcon from '../../../assets/images/addFriendsIcon.svg'
import Friends from './Friends'
import AddFriends from './AddFriends'
import FriendsRequests from './FriendsRequests'

import {
  MainSectionContainer,
  Header,
  NavList,
  NavItem,
  MainSectionContent
} from './styles'

const MainSection: React.FC<{ isChatting: boolean }> = ({ isChatting }) => {
  return (
    <MainSectionContainer className={isChatting ? 'chatting' : ''}>
      <Header>
        <button id="profile-button">
          <img src={defaultAvatarIcon} alt="avatar" />
          Wellington Pacheco
        </button>
        <button id="logout-button" type="button">
          <img src={logoutIcon} alt="Logout" />
        </button>
      </Header>
      <nav>
        <NavList>
          <NavItem>
            <NavLink to="/home/" exact activeClassName="active">
              <img src={messagesIcon} alt="MessagesIcon" />
              <span>Messages</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/home/requests" activeClassName="active">
              <img src={friendsReqIcon} alt="Frieds Requests Icon" />
              <span>Friends Requests</span>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/home/add-friends" activeClassName="active">
              <img src={addFriendsIcon} alt="Add Frieds Icon" />
              <span>Add Friends</span>
            </NavLink>
          </NavItem>
        </NavList>
      </nav>
      <MainSectionContent>
        <Switch>
          <Route path="/home/" exact component={Friends} />
          <Route path="/home/requests" component={FriendsRequests} />
          <Route path="/home/add-friends" component={AddFriends} />
        </Switch>
      </MainSectionContent>
    </MainSectionContainer>
  )
}

export default MainSection
