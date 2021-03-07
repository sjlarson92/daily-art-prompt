import axios from 'axios'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

export const getPromptByDate = (dispatch, date) => {
  axios.get(`${GATEWAY_URL}/api/prompts?date=${date}`).then(r => {
    dispatch({
      type: TYPES.SET_CURRENT_PROMPT,
      payload: {
        prompt: r.data,
      },
    })
  })
}
