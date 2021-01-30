import React, { useState } from 'react'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { validateLogin } from './authRequests'
import './login.css'
import DapInput from '../DapInput'
import DapLogo from '../DapLogo'
import UserCardFooter from '../UserCardFooter'

const LoginScreen = () => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const errorMessage = useSelector(state => state.errorMessage)
  const location = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()

  return (
    <div>
      {location?.state?.message && (
        <div data-testid="message">{location.state.message}</div>
      )}
      <div data-testid="errorMessage">{errorMessage}</div>
      <div className="d-flex login-div-container justify-content-center">
        <div className="user-card">
          <DapLogo />
          <div className="d-flex justify-content-center">
            <form>
              <DapInput
                icon={faUser}
                fieldType="text"
                fieldName="email"
                handleOnChange={eventEmail => setEmail(eventEmail)}
              />
              <DapInput
                icon={faKey}
                fieldType="password"
                fieldName="password"
                handleOnChange={eventPassword => setPassword(eventPassword)}
              />
              <div className="d-flex justify-content-center mt-3 login-container">
                <button
                  data-testid="loginButton"
                  type="button"
                  name="loginButton"
                  className="btn login-btn"
                  onClick={() =>
                    validateLogin(dispatch, history, email, password)
                  }
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <UserCardFooter
            linkQuestion="Don't have an account?"
            linkText="Sign Up"
            linkTo="/sign-up"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
