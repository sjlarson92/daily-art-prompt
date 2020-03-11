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
      <button data-testid="submitButton" onClick={() => handleOnClick()}>
        Submit
      </button>
    </div>
  )
}

export default SignUpScreen
