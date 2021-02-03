import axios from 'axios'

export const createUser = (dispatch, history, email, password) => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  console.log('GATEWAY_URL: ', GATEWAY_URL)
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
