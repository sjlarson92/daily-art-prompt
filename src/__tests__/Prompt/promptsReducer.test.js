import * as TYPES from '../../main/storage/actions'
import { promptReducer } from '../../main/Prompt/promptReducer'

describe('promptsReducer', () => {
  describe('when action.type is SET_CURRENT_PROMPT', () => {
    it('should return prompt', () => {
      const prompt = 'some prompt'
      const state = {}
      const action = {
        type: TYPES.SET_CURRENT_PROMPT,
        payload: {
          prompt,
        },
      }
      expect(promptReducer(state, action)).toEqual(prompt)
    })
  })
  describe('when action.type is default', () => {
    it('should return state', () => {
      const state = {}
      const action = {
        type: '',
      }
      expect(promptReducer(state, action)).toEqual(state)
    })
  })
})
