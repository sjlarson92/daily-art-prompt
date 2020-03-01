import * as TYPES from '../store/actions'

export const promptsReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.SET_INITIAL_PROMPTS:
      return action.payload.prompts
    default:
      return state
  }
}
