import axios from 'axios'
import * as TYPES from '../../storage/actions'
import { GATEWAY_URL } from '../../constants'

export const validateLogin = (dispatch, history, email, password) => {
  return axios
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
          name: response.data.name,
          id: response.data.id,
          role: response.data.role,
        },
      })
      history.push('/')
    })
}
