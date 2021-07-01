import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import GlobalStyles from './styles/GlobalStyles'
import Login from './pages/Login'
import Sign from './pages/Sign'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/sign" component={Sign} />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  )
}

export default App
