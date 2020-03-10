import axios from 'axios'

export const createUser = (dispatch, email, password) => {
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
      console.log('response returned!')
    })
}
