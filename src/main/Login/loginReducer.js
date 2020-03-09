import * as TYPES from '../storage/actions'

export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return true
    case TYPES.LOGOUT:
      return false
    default:
      return state
  }
}
