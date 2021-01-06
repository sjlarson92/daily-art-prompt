import axios from 'axios'
import * as TYPES from '../../storage/actions'

export const validateLogin = (dispatch, history, email, password) => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  axios
    .post(`${GATEWAY_URL}/api/login`, null, {
      auth: {
        username: email,
        password,
      },
    })
    .then(response => {
      dispatch({
        type: TYPES.LOGIN,
        payload: {
          email: response.data.email,
          id: response.data.id,
          role: response.data.role,
        },
      })
      history.push('/')
    })
    .catch(error => {
      dispatch({
        type: TYPES.SET_ERROR_MESSAGE,
        payload: {
          error: 'Incorrect email or password',
        },
      })
    })
}
