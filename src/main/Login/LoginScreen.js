import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const userEmail = 'sjlarson92@gmail.com'
  const userPassword = '123'

  const checkLogin = () => {
    if (email === userEmail && password === userPassword) {
      console.log('login successful')
      history.push('/dap')
    }
    console.log('login failed!')
  }

  return (
    <div>
      <h1>Login Screen</h1>
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
