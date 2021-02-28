import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ImageLayout from './ImageLayout'
import { GATEWAY_URL } from '../constants'
import * as TYPES from '../storage/actions'

const ImageGallery = () => {
  const currentPromptId = useSelector(state => state.currentPromptId)
  const user = useSelector(state => state.user)
  const images = useSelector(state => state.images)
  const dispatch = useDispatch()

  useEffect(() => {
    // TODO: make new api to get * images for userId where promptId = currentPromptId
    // TODO: put in imagesApi?
    // /users/${id}/images?promptId=promptId
    if (currentPromptId != null) {
      axios
        .get(
          `${GATEWAY_URL}/api/users/${user.id}/images?promptId=${currentPromptId}`,
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
  }, [currentPromptId, user.id])

  return (
    <div id="image-gallery">
      {images?.length > 0 &&
        images.map(image => (
          <ImageLayout
            data-className="imageLayout"
            data-testid={`image-${image.id}`}
            key={image.id}
            image={image}
          />
        ))}
    </div>
  )
}

export default ImageGallery
