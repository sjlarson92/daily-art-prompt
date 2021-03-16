import axios from 'axios'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

export const getImagesByPromptAndUserId = (dispatch, user, currentPromptId) => {
  axios
    .get(
      `${GATEWAY_URL}/api/images?promptId=${currentPromptId}&userId=${user.id}`,
    )
    .then(r => {
      const newImages = r.data
      dispatch({
        type: TYPES.SET_USER_IMAGES,
        payload: {
          images: newImages,
        },
      })
    })
}

export const getCommunityImagesByPromptIdAndUserId = (
  dispatch,
  user,
  currentPromptId,
) => {
  axios
    .get(
      `${GATEWAY_URL}/api/community-images?promptId=${currentPromptId}&userId=${user.id}`,
    )
    .then(r => {
      console.log('response: ', r.data)
      dispatch({
        type: TYPES.SET_USER_IMAGES,
        payload: {
          images: r.data,
        },
      })
    })
}

export const updateLikeImageAction = (updatedImage, dispatch) => {
  axios
    .put(`${GATEWAY_URL}/api/images/${updatedImage.id}`, updatedImage)
    .then(r => {
      dispatch({
        type: TYPES.UPDATE_IMAGE,
        payload: {
          updatedImage: r.data,
        },
      })
    })
}

export const deleteImageAction = imageId => {
  axios.delete(`${GATEWAY_URL}/api/images/${imageId}`).then(r => {
    console.log('response data for deleting image: ', r.data)
  })
}

export const uploadImageAction = (
  id,
  currentPromptId,
  imageDescription,
  insertedImage,
  dispatch,
) => {
  const formData = new FormData()
  formData.append('description', imageDescription)
  formData.append('file', insertedImage)
  return axios
    .post(
      `${GATEWAY_URL}/api/users/${id}/images?promptId=${currentPromptId}`,
      formData,
    )
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
