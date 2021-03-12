import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Image from './Image'
import CommentContainer from '../Comment/CommentContainer'
import { updateLikeImageAction } from './imageApi'

const ImageLayout = ({ image }) => {
  const dispatch = useDispatch()

  const updateLikeImage = () => {
    const updatedImage = { ...image, liked: !image.liked }
    updateLikeImageAction(updatedImage, dispatch)
  }

  return (
    <div id="image-layout-container">
      <Image
        data-testid="image"
        onDoubleClick={updateLikeImage}
        image={image}
      />
      <div id="image-details-container">
        <FontAwesomeIcon
          id={image.liked ? 'liked' : 'unliked'}
          className="pointer-on-hover"
          icon={faHeart}
          onClick={updateLikeImage}
        />
      </div>
      <div>{image.description}</div>
      <CommentContainer imageId={image.id} />
    </div>
  )
}

export default ImageLayout
