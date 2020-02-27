import axios from 'axios'
import _ from 'lodash'
import * as TYPES from '../store/actions'

export const getImagesAction = () => dispatch => {
  const DAP_SERVICE = process.env.REACT_APP_DAP_SERVICE
  _.times(3, () =>
    axios.get(`${DAP_SERVICE}/images/1`).then(response => {
      dispatch({
        type: TYPES.SET_INITIAL_IMAGES,
        payload: {
          image: response.data,
        },
      })
    }),
  )
}
