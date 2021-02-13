import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import axios from 'axios'
import LoginScreen from './User/Login/LoginScreen'
import HomeScreen from './Home/HomeScreen'
import ErrorScreen from './User/Login/ErrorScreen'
import store from './storage/store'
import SignUpScreen from './User/SignUp/SignUpScreen'
import './Home/main.css'
import { GATEWAY_URL } from './constants'

export const App = () => {
  useEffect(() => {
    axios
      .get(`${GATEWAY_URL}/api/actuator/health`)
      .then(r => console.log('health status check: ', r.data.status))
  }, [])
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
