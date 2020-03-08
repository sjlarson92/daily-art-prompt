import axios from 'axios'
import _ from 'lodash'
import * as TYPES from '../storage/actions'

export const getImagesAction = () => dispatch => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  _.times(3, () =>
    axios.get(`${GATEWAY_URL}/api/images/1`).then(response => {
      dispatch({
        type: TYPES.SET_INITIAL_IMAGES,
        payload: {
          image: response.data,
        },
      })
    }),
  )
}
