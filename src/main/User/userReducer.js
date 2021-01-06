import * as TYPES from '../storage/actions'

const User = {
  id: null,
  email: '',
  isLoggedIn: false,
  role: null,
}

export const userReducer = (state = User, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        email: action.payload.email,
        id: action.payload.id,
        isLoggedIn: true,
        role: action.payload.role,
      }
    case TYPES.LOGOUT:
      return User
    default:
      return state
  }
}
