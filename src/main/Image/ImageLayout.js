import React from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Image from './Image'
import CommentContainer from '../Comment/CommentContainer'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

const ImageLayout = ({ image }) => {
  const dispatch = useDispatch()

  const updateLikeImage = () => {
    const updatedImage = { ...image, liked: !image.liked }
    axios.put(`${GATEWAY_URL}/api/images/${image.id}`, updatedImage).then(r => {
      dispatch({
        type: TYPES.UPDATE_IMAGE,
        payload: {
          updatedImage: r.data,
        },
      })
    })
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
      <CommentContainer imageId={image.id} />
    </div>
  )
}

export default ImageLayout
