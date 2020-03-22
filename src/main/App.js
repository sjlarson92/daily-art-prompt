import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import LoginScreen from './User/Login/LoginScreen'
import HomeScreen from './Home/HomeScreen'
import ErrorScreen from './User/Login/ErrorScreen'
import store from './storage/store'
import SignUpScreen from './User/SignUp/SignUpScreen'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/sign-up" component={SignUpScreen} />
          <Route component={ErrorScreen} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
