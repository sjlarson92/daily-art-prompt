import axios from 'axios'
import { GATEWAY_URL } from '../constants'

export const createUser = (dispatch, history, email, name, password) => {
  return axios
    .post(`${GATEWAY_URL}/api/users`, name, {
      headers: {
        email,
        password,
      },
    })
    .then(() => {
      history.push('/login', { message: 'Successfully Created New Account' })
    })
}
