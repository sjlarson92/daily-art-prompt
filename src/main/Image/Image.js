import React from 'react'

const Image = ({ image, onDoubleClick }) => {
  return (
    <img
      className="user-image"
      src={image.url}
      alt={image.description}
      onDoubleClick={onDoubleClick}
    />
  )
}

export default Image
