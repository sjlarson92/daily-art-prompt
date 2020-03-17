import axios from 'axios'

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
      history.push('/login')
      // TODO: render successfully created account message
    })
  // TODO: create catch block
}
