import axios from 'axios'
import { GATEWAY_URL } from '../constants'

export const createUser = (dispatch, history, email, password) => {
  return axios
    .post(`${GATEWAY_URL}/api/users`, null, {
      headers: {
        email,
        password,
      },
    })
    .then(() => {
      history.push('/login', { message: 'Successfully Created New Account' })
    })
}
