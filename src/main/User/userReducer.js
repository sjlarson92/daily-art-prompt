import * as TYPES from '../storage/actions'

const initialState = {
  id: null,
  email: '',
  isLoggedIn: false,
  role: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      return {
        email: action.payload.email,
        id: action.payload.id,
        isLoggedIn: true,
        role: action.payload.role,
      }
    default:
      return state
  }
}
