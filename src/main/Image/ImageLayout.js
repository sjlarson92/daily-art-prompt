import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Image from './Image'
import CommentContainer from '../Comment/CommentContainer'
import * as TYPES from '../storage/actions'

const ImageLayout = ({ image }) => {
  const dispatch = useDispatch()

  const updateLikeImage = () => {
    dispatch({
      type: TYPES.UPDATE_IMAGE_LIKED,
      payload: {
        imageId: image.id,
      },
    })
  }

  return (
    <div id="image-layout-container">
      <Image data-testid="image" image={image} />
      <div id="image-details-container">
        <FontAwesomeIcon
          id={image.liked ? 'liked' : 'unliked'}
          className="pointer-on-hover"
          icon={faHeart}
          onClick={updateLikeImage}
        />
      </div>
      <CommentContainer imageId={image.id} />
    </div>
  )
}

export default ImageLayout
