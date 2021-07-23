import React, { Suspense, lazy, useState } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { RootState, AppDispatch } from '../../../store'
import { logoutAction } from '../../../store/auth/authActions'
import defaultAvatarIcon from '../../../assets/images/defaultAvatarIcon.svg'
import logoutIcon from '../../../assets/images/logoutIcon.svg'
import messagesIcon from '../../../assets/images/messagesIcon.svg'
import friendsReqIcon from '../../../assets/images/friedsReqIcon.svg'
import addFriendsIcon from '../../../assets/images/addFriendsIcon.svg'
import UploadAvatarModal from './UploadAvatarModal'
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
  const [openAvatarModal, setOpenAvatarModal] = useState(false)
  const user = useSelector((state: RootState) => state.user)
  const friends = useSelector((state: RootState) => state.friends.array)
  const dispatch = useDispatch<AppDispatch>()

  let unreadMessages = 0
  for (const friend of friends) {
    unreadMessages += friend.unreadMessages
  }

  const qtdRequests = user.requestsReceived.length

  return (
    <>
      {!user.avatar ||
        (openAvatarModal && (
          <UploadAvatarModal
            aria-hidden="true"
            onClose={setOpenAvatarModal.bind(null, false)}
          />
        ))}
      <MainSectionContainer className={!!user.chattingWith ? 'chatting' : ''}>
        <Header>
          <button
            id="profile-button"
            onClick={setOpenAvatarModal.bind(null, true)}
          >
            <img src={user.avatar ?? defaultAvatarIcon} alt="avatar" />
            {user.name}
          </button>
          <button
            id="logout-button"
            type="button"
            onClick={() => dispatch(logoutAction())}
          >
            <img src={logoutIcon} alt="Logout" />
          </button>
        </Header>
        <nav>
          <NavList>
            <NavItem
              className={unreadMessages ? 'unread-messages' : ''}
              data-messages={unreadMessages}
              aria-label={`${unreadMessages} new messages`}
            >
              <NavLink to="/" exact activeClassName="active">
                <img src={messagesIcon} alt="MessagesIcon" />
                <span>Messages</span>
              </NavLink>
            </NavItem>
            <NavItem
              className={qtdRequests ? 'new-requests' : ''}
              data-requests={qtdRequests}
              aria-label={`${qtdRequests} new requests`}
            >
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
    </>
  )
}

export default MainSection
