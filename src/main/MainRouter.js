import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom'
import React, { useState } from 'react'

import LoginScreen from './Login/LoginScreen'
import EntryScreen from './DailyArtPromptApp/EntryScreen'

const MainRouter = () => {
  return (
    <Router>
      <Link to="/">Daily Art Prompt</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <PrivateRoute exact path="/">
          <EntryScreen />
        </PrivateRoute>
        <Route path="/login">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  )
}

const PrivateRoute = () => {
  // TODO: put loggedIn in redux
  const [loggedIn, setLoggedIn] = useState(false)

  if (loggedIn) {
    return <EntryScreen />
  }
  return <LoginScreen />
}

export default MainRouter
