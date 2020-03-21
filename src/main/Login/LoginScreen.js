import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import * as TYPES from '../storage/actions'

const LoginScreen = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  const userEmail = 'sjlarson92@gmail.com'
  const userPassword = '123'
  const checkLogin = () => {
    if (email === userEmail && password === userPassword) {
      dispatch({ type: TYPES.LOGIN })
      console.log('login successful')
      history.push('/')
    } else {
      setErrorMessage('Login Failed. Please try again.')
      console.log('login failed!')
    }
  }

  return (
    <div>
      <h1 data-testid="header">Login Screen</h1>
      {location?.state?.message && (
        <div data-testid="message">{location.state.message}</div>
      )}
      <div data-testid="errorMessage">{errorMessage}</div>
      <input
        data-testid="emailInput"
        name="email"
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        data-testid="passwordInput"
        name="password"
        type="text"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button
        data-testid="loginButton"
        type="button"
        name="loginButton"
        onClick={checkLogin}
      >
        Login
      </button>
      <button
        data-testid="signUpButton"
        onClick={() => history.push('/sign-up')}
      >
        Sign Up
      </button>
    </div>
  )
}

export default LoginScreen
