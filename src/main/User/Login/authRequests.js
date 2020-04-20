import axios from 'axios'
import * as TYPES from '../../storage/actions'

export const validateLogin = (dispatch, history, email, password) => {
  console.log('email: ', email)
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  axios
    .post(`${GATEWAY_URL}/api/login`, null, {
      auth: {
        username: email,
        password,
      },
    })
    .then(response => {
      console.log('response: ', response)
      dispatch({
        type: TYPES.LOGIN,
      })
      history.push('/')
    })
    .catch(error => {
      console.log('FAIL: Failed to login with error', error.message)
      dispatch({
        type: TYPES.SET_ERROR_MESSAGE,
        payload: {
          error: 'Incorrect email or password',
        },
      })
    })
}
