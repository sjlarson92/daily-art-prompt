import * as TYPES from '../storage/actions'

export const imagesReducer = (state = [], action) => {
  switch (action.type) {
    case TYPES.SET_USER_IMAGES: {
      const { images } = action.payload
      return images ? [...state, ...images] : state
    }

    case TYPES.ADD_IMAGE: {
      const { image } = action.payload
      return image ? [...state, image] : state
    }

    case TYPES.UPDATE_IMAGE_LIKED:
      return state.map(image => {
        if (image.id === action.payload.imageId) {
          return {
            ...image,
            liked: !image.liked,
          }
        }
        return image
      })

    case TYPES.ADD_COMMENT:
      return state.map(image => {
        if (image.id === action.payload.imageId) {
          const newComment = {
            id:
              image.comments?.length > 0
                ? image.comments[image.comments.length - 1].id + 1
                : 1,
            text: action.payload.value,
          }
          return {
            ...image,
            comments:
              image?.comments?.length > 0
                ? [...image.comments, newComment]
                : [newComment],
          }
        }
        return image
      })

    case TYPES.DELETE_COMMENT:
      return state.map(image => {
        if (image.id === action.payload.imageId) {
          const updatedComments = image.comments.map(comment => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                deleted: true,
              }
            }
            return comment
          })
          return {
            ...image,
            comments: updatedComments,
          }
        }
        return image
      })

    case TYPES.UPDATE_COMMENT_EDITING:
      return state.map(image => {
        if (image.id === action.payload.imageId) {
          const updatedCommentsClassName = image.comments.map(comment => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                editing: !comment.editing,
              }
            }
            return comment
          })
          return {
            ...image,
            comments: updatedCommentsClassName,
          }
        }
        return image
      })

    case TYPES.EDIT_COMMENT:
      return state.map(image => {
        if (image.id === action.payload.imageId) {
          const updatedComments = image.comments.map(comment => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                text: action.payload.value,
                editing: false,
              }
            }
            return comment
          })
          return {
            ...image,
            comments: updatedComments,
          }
        }
        return image
      })
    default:
      return state
  }
}
