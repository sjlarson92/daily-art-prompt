import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { createUser } from '../userRequests'
import * as TYPES from '../../storage/actions'
import DapInput from '../DapInput'
import DapLogo from '../DapLogo'
import UserCardFooter from '../UserCardFooter'

const SignUpScreen = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const errorMessage = useSelector(state => state.errorMessage)

  const handleOnClick = () => {
    dispatch({
      type: TYPES.SET_ERROR_MESSAGE,
      payload: {
        error: null,
      },
    })
    createUser(dispatch, history, email, password)
  }
  return (
    <div>
      <div className="d-flex login-div-container justify-content-center">
        <div data-testid="errorMessage">{errorMessage}</div>
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
