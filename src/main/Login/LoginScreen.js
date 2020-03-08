import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import * as TYPES from '../storage/actions'

const LoginScreen = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()

  const userEmail = 'sjlarson92@gmail.com'
  const userPassword = '123'

  const checkLogin = () => {
    if (email === userEmail && password === userPassword) {
      dispatch({ type: TYPES.SUCCESSFUL_LOGIN })
      console.log('login successful')
      history.push('/')
    } else {
      setErrorMessage('Login Failed. Please try again.')
      console.log('login failed!')
    }
  }

  return (
    <div>
      <h1>Login Screen</h1>
      {errorMessage}
      <input
        name="email"
        type="text"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        name="password"
        type="text"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button type="button" name="loginButton" onClick={checkLogin}>
        Login
      </button>
    </div>
  )
}

export default LoginScreen
