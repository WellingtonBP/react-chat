import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { RootState } from './store'
import GlobalStyles from './styles/GlobalStyles'
import Login from './pages/Login'
import Sign from './pages/Sign'
import Home from './pages/Home'

const App: React.FC = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated)

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
