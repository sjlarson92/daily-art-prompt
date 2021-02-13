import axios from 'axios'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

export const getPromptsAction = () => dispatch => {
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
