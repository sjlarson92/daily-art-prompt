import axios from 'axios'
import * as TYPES from '../storage/actions'

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

export const getImagesAction = id => dispatch => {
  console.log('GATEWAY_URL: ', GATEWAY_URL)
  axios.get(`${GATEWAY_URL}/api/users/${id}/images`).then(response => {
    dispatch({
      type: TYPES.SET_USER_IMAGES,
      payload: {
        images: response.data,
      },
    })
  })
}

export const uploadImageAction = (
  id,
  imageDescription,
  insertedImage,
  dispatch,
) => {
  const formData = new FormData()
  formData.append('description', imageDescription)
  formData.append('file', insertedImage)
  return axios
    .post(`${GATEWAY_URL}/api/users/${id}/images`, formData)
    .then(response => {
      if (response.status === 201) {
        dispatch({
          type: TYPES.ADD_IMAGE,
          payload: { image: response.data },
        })
        return { message: 'Image has been saved', variant: 'success' }
      }
      return {
        message: 'Failed to save image. Please try again.',
        variant: 'danger',
      }
    })
    .catch(e => {
      console.log('Failed to save image with exception: ', e)
      return {
        message: 'Failed to save image. Please try again.',
        variant: 'danger',
      }
    })
}
