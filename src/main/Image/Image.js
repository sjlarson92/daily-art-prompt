import React from 'react'
import { useDispatch } from 'react-redux'
import * as TYPES from '../storage/actions'

const Image = ({ image }) => {
  const dispatch = useDispatch()
  return (
    <img
      className="user-image"
      src={image.url}
      alt={image.description}
      onDoubleClick={() =>
        dispatch({
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            imageId: image.id,
          },
        })
      }
    />
  )
}

export default Image
