import * as TYPES from '../storage/actions'

const initialPrompt = {
  id: null,
  date: null,
  text: null,
}

export const promptReducer = (state = initialPrompt, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENT_PROMPT:
      return action.payload.prompt
    default:
      return state
  }
}
