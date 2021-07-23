import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { autoLogin } from './store/auth/authActions'
import { RootState } from './store'
import GlobalStyles from './styles/GlobalStyles'
import Login from './pages/Login'
import Sign from './pages/Sign'
import Home from './pages/Home'

const savedToken = localStorage.getItem('token')

const App: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)
  const dispatch = useDispatch()

  useEffect(() => {
    if (savedToken) {
      dispatch(autoLogin(JSON.parse(savedToken)))
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login">{isAuth ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/sign">{isAuth ? <Redirect to="/" /> : <Sign />}</Route>
        <Route path="/">{isAuth ? <Home /> : <Redirect to="/login" />}</Route>
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  )
}

export default App
