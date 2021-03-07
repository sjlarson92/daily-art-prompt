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
import PromptImagesScreen from './Home/PromptImagesScreen'

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
          <Route testid="home" exact path="/" component={HomeScreen} />
          <Route testid="login" path="/login" component={LoginScreen} />
          <Route testid="signUp" path="/sign-up" component={SignUpScreen} />
          <Route
            testid=""
            path="/prompt-images/:date/community-gallery"
            component={PromptImagesScreen}
          />
          <Route
            testid="promptScreen"
            path="/prompt-images/:date"
            component={PromptImagesScreen}
          />
          <Route testid="error" component={ErrorScreen} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
