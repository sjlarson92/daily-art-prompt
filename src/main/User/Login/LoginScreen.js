import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import logo from '../../images/dapLogo.png'
import { validateLogin } from './authRequests'
import './login.css'

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
          <div className="d-flex justify-content-center">
            <div className="brand-logo-container">
              <img
                src={logo}
                style={{ height: 350 }}
                className="brand-logo"
                alt="Logo"
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <form>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faUser} />
                  </span>
                </div>
                <input
                  data-testid="emailInput"
                  type="text"
                  name="email"
                  className="form-control input-user"
                  onChange={e => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
              <div className="input-group mb-2">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <FontAwesomeIcon icon={faKey} />
                    <i className="fas fa-key" />
                  </span>
                </div>
                <input
                  data-testid="passwordInput"
                  type="password"
                  name="password"
                  className="form-control input-pass"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
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

          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              Don't have an account?
              <Link testid="signUpLink" to="/sign-up" className="ml-2">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen
