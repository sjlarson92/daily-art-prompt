import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import React from 'react'
import LoginScreen from './Login/LoginScreen'
import EntryScreen from './DailyArtPromptApp/EntryScreen'

const MainRouter = () => {
  return (
    <Router>
      <Link to="/dap">Daily Art Prompt</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <Route path="/login">
          <LoginScreen />
        </Route>
        <Route path="/dap">
          <EntryScreen />
        </Route>
      </Switch>
    </Router>
  )
}

export default MainRouter
