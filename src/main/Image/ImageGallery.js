import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ImageLayout from './ImageLayout'
import {
  getCommunityImagesByPromptIdAndUserId,
  getImagesByPromptAndUserId,
} from './imageApi'

const ImageGallery = () => {
  const currentPromptId = useSelector(state => state.prompt.id)
  const user = useSelector(state => state.user)
  const images = useSelector(state => state.images)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (currentPromptId != null) {
      if (location.pathname.endsWith('community-gallery')) {
        getCommunityImagesByPromptIdAndUserId(dispatch, user, currentPromptId)
      } else {
        getImagesByPromptAndUserId(dispatch, user, currentPromptId)
      }
    }
  }, [currentPromptId, user, dispatch, location.pathname])

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
