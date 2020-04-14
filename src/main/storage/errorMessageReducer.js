import * as TYPES from './actions'

export const errorMessageReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_ERROR_MESSAGE:
      return action.payload.error
    default:
      return state
  }
}
