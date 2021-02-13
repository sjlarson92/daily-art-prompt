import React from 'react'
import { useSelector } from 'react-redux'
import ImageLayout from './ImageLayout'

const ImageGallery = () => {
  const images = useSelector(state => state.images)
  const currentPromptId = useSelector(state => state.currentPromptId)

  return (
    <div id="image-gallery">
      {images?.length > 0 &&
        images.map(
          image =>
            image.promptId === currentPromptId && (
              <ImageLayout
                data-className="imageLayout"
                data-testid={`image-${image.id}`}
                key={image.id}
                image={image}
              />
            ),
        )}
    </div>
  )
}

export default ImageGallery
