import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from './createUserApi'

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const handleOnClick = () => {
    console.log('email: ', email)
    console.log('password: ', password)
    createUser(dispatch, email, password)
  }
  return (
    <div>
      <h1 data-testid="header">Sign Up</h1>
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
      <button onClick={() => handleOnClick()}>Submit</button>
    </div>
  )
}

export default SignUpScreen
