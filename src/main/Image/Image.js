import React from 'react'
import { connect } from 'react-redux'
import * as TYPES from '../storage/actions'

export const Image = ({ image, updatePromptImages }) => (
  // <img
  //   src={image.src}
  //   alt={image.name}
  //   onDoubleClick={() => updatePromptImages(image.id)}
  // />
  <div data-testid="image" onDoubleClick={() => updatePromptImages(image.id)}>
    <h1>{image.src}</h1>
  </div>
)

export const mapDispatchToProps = dispatch => ({
  updatePromptImages: imageId =>
    dispatch({
      type: TYPES.UPDATE_PROMPT_IMAGES,
      payload: {
        imageId,
      },
    }),
})

export default connect(null, mapDispatchToProps)(Image)
