import React from 'react';
import * as TYPES from "../store/actions";
import {connect} from 'react-redux';

const Image = ({image, updatePromptImages}) =>
  <img
    src={image.src}
    alt={image.name}
    onDoubleClick={() => updatePromptImages(image.id)}
  />

export const mapDispatchToProps = (dispatch) => ({
  updatePromptImages: (imageId) => dispatch({
    type: TYPES.UPDATE_PROMPT_IMAGES,
    payload: {
      imageId
    }
  }),
})

export default connect(null, mapDispatchToProps)(Image)