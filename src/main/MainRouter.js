import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import { useSelector } from 'react-redux'

import LoginScreen from './Login/LoginScreen'
import EntryScreen from './DailyArtPromptApp/EntryScreen'

export const MainRouter = () => {
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
  const loggedIn = useSelector(state => state.loggedIn)
  if (loggedIn) {
    return <EntryScreen />
  }
  return <LoginScreen />
}

export default MainRouter
