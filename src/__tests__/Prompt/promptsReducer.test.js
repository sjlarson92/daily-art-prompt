import * as TYPES from '../../main/store/actions'
import { promptsReducer } from '../../main/Prompt/promptsReducer'

describe('promptsReducer', () => {
  describe('when action.type is SET_INITIAL_PROMPTS', () => {
    it('should return initial prompts', () => {
      const state = []
      const action = {
        type: TYPES.SET_INITIAL_PROMPTS,
        payload: {
          prompts: 'NOT an array of prompts',
        },
      }
      expect(promptsReducer(state, action)).toEqual('NOT an array of prompts')
    })
  })
  describe('when action.type is default', () => {
    it('should return state', () => {
      const state = []
      const action = {
        type: '',
      }
      expect(promptsReducer(state, action)).toEqual(state)
    })
  })
})
