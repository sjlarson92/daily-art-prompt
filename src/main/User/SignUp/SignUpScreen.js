import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import Alert from 'react-bootstrap/Alert'
import { createUser } from '../userRequests'
import DapInput from '../DapInput'
import DapLogo from '../DapLogo'
import UserCardFooter from '../UserCardFooter'

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [alert, setAlert] = useState(null)

  const onKeyPress = key => {
    if (key === 'Enter') {
      handleOnClick()
    }
  }

  const handleOnClick = () => {
    createUser(dispatch, history, email, password).catch(error => {
      const message =
        error.response.status === 409
          ? error.response.headers.message
          : 'An error occurred. Please try again.'
      setAlert(message)
    })
  }
  return (
    <div>
      <div className="d-flex user-card-div-container justify-content-center">
        <div className="user-card">
          <DapLogo />
          {alert && (
            <Alert
              data-testid="errorMessage"
              variant="danger"
              onClose={() => setAlert(null)}
              dismissible
            >
              {alert}
            </Alert>
          )}
          <div className="d-flex justify-content-center">
            <form>
              <DapInput
                testid="emailInput"
                icon={faUser}
                fieldType="text"
                fieldName="email"
                onChange={eventEmail => setEmail(eventEmail)}
                onKeyPress={onKeyPress}
              />
              <DapInput
                testid="passwordInput"
                icon={faKey}
                fieldType="password"
                fieldName="password"
                onChange={eventPassword => setPassword(eventPassword)}
                onKeyPress={onKeyPress}
              />
              <div className="d-flex justify-content-center mt-3 login-container">
                <button
                  data-testid="submitButton"
                  type="button"
                  name="submitButton"
                  className="btn login-btn"
                  onClick={handleOnClick}
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <UserCardFooter
            linkQuestion="Have an account?"
            linkText="Login"
            linkTo="/login"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpScreen
