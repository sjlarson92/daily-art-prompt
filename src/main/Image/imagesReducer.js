import * as TYPES from '../storage/actions'

export const imagesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_USER_IMAGES: {
      const { images } = action.payload
      return images
    }

    case TYPES.ADD_IMAGE: {
      const { image } = action.payload
      return image ? [...state, image] : state
    }

    case TYPES.UPDATE_IMAGE:
      return state.map(image => {
        if (image.id === action.payload.updatedImage.id) {
          return action.payload.updatedImage
        }
        return image
      })
    default:
      return state
  }
}
