import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Image from './Image'
import CommentContainer from '../Comment/CommentContainer'
import { updateLikeImageAction, deleteImageAction } from './imageApi'

const ImageLayout = ({ image }) => {
  const dispatch = useDispatch()
  const userId = useSelector(state => state.user.id)

  const updateLikeImage = () => {
    const updatedImage = { ...image, liked: !image.liked }
    updateLikeImageAction(updatedImage, dispatch)
  }

  const deleteImage = () => {
    deleteImageAction(image.id, dispatch)
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
          testid="likeImage"
          className="pointer-on-hover"
          icon={faHeart}
          onClick={updateLikeImage}
        />
        {image.userId === userId && (
          <DropdownButton
            testid="deleteImageDropdown"
            id="delete-image"
            className="pointer-on-hover"
            variant="none"
            title={<FontAwesomeIcon icon={faEllipsisH} />}
          >
            <Dropdown.Item
              testid="deleteImage"
              as="button"
              onClick={deleteImage}
            >
              Delete Image
            </Dropdown.Item>
          </DropdownButton>
        )}
      </div>
      <div>{image.description}</div>
      <CommentContainer imageId={image.id} />
    </div>
  )
}

export default ImageLayout
