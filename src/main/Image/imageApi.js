import axios from 'axios'
import * as TYPES from '../storage/actions'

export const getImagesAction = id => dispatch => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  console.log(`making request with id: ${id}`)
  axios.get(`${GATEWAY_URL}/api/users/${id}/images`).then(response => {
    dispatch({
      type: TYPES.SET_USER_IMAGES,
      payload: {
        images: response.data,
      },
    })
  })
}
