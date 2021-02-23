import * as TYPES from '../storage/actions'

const initialCurrentPromptId = null

export const promptIdReducer = (state = initialCurrentPromptId, action) => {
  switch (action.type) {
    case TYPES.SET_CURRENT_PROMPT_ID:
      return action.payload.promptId
    default:
      return state
  }
}
