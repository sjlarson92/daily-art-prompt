import axios from 'axios'

export const validateLogin = (dispatch, history, email, password) => {
  console.log('email: ', email)
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  axios.post(`${GATEWAY_URL}/api/login`, null, {
    auth: {
      email,
      password,
    },
  })
}
