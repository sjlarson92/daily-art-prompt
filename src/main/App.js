import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import LoginScreen from './Login/LoginScreen'
import HomeScreen from './Home/HomeScreen'
import ErrorScreen from './Login/ErrorScreen'
import store from './storage/store'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route component={ErrorScreen} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
