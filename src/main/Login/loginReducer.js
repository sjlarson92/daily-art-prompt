import * as TYPES from '../store/actions'

export const loginReducer = (state = false, action) => {
  switch (action.type) {
    case TYPES.SUCCESSFUL_LOGIN:
      return true
    default:
      return state
  }
}
