import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageLayout from './ImageLayout'
import { getImagesByPromptAndUserId } from './imageApi'

const ImageGallery = () => {
  const currentPromptId = useSelector(state => state.prompt.id)
  const user = useSelector(state => state.user)
  const images = useSelector(state => state.images)
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentPromptId != null) {
      getImagesByPromptAndUserId(dispatch, user, currentPromptId)
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
