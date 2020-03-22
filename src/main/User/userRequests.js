import axios from 'axios'
import * as TYPES from '../storage/actions'

export const createUser = (dispatch, history, email, password) => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  console.log('GATEWAY_URL: ', GATEWAY_URL)
  axios
    .post(`${GATEWAY_URL}/api/users`, null, {
      headers: {
        email,
        password,
      },
    })
    .then(response => {
      console.log('response: ', response)
      history.push('/login', { message: 'Successfully Created New Account' })
    })
    .catch(error => {
      console.log('FAIL: Failed to create new user with error: ', error.message)
      dispatch({
        type: TYPES.SET_ERROR_MESSAGE,
        payload: {
          error: 'Email already in use. Please try again',
        },
      })
    })
}
