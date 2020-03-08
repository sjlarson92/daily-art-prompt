import axios from 'axios'
import * as TYPES from '../storage/actions'

export const getPromptsAction = () => dispatch => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  console.log('GATEWAY_URL: ', GATEWAY_URL)
  axios
    .get(`${GATEWAY_URL}/api/prompts`)
    .then(response => {
      dispatch({
        type: TYPES.SET_INITIAL_PROMPTS,
        payload: {
          prompts: response.data,
        },
      })
    })
    .catch(error => {
      console.log('Failed to fetch prompt data from API with error: ', error)
    })
}
