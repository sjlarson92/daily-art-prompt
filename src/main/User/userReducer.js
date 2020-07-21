import * as TYPES from '../storage/actions'

const User = {
  email: '',
  id: null,
  isLoggedIn: false,
}

export const userReducer = (state = User, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        email: action.payload.email,
        id: action.payload.id,
        isLoggedIn: true,
      }
    case TYPES.LOGOUT:
      return User
    default:
      return state
  }
}
