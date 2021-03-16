import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
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
        <DropdownButton
          id="delete-image"
          className="pointer-on-hover"
          variant="none"
          title={<FontAwesomeIcon icon={faEllipsisH} />}
        >
          <Dropdown.Item
            as="button"
            onClick={() => {
              console.log('click... ')
            }}
          >
            Delete Image
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div>{image.description}</div>
      <CommentContainer imageId={image.id} />
    </div>
  )
}

export default ImageLayout
