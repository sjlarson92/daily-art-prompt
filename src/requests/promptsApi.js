import axios from 'axios'
import * as TYPES from '../store/actions'

export const getPromptsAction = () => dispatch => {
  const DAP_SERVICE = process.env.REACT_APP_DAP_SERVICE
  console.log('DAP_SERVICE: ', DAP_SERVICE)
  axios
    .get(`${DAP_SERVICE}/prompts`)
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
