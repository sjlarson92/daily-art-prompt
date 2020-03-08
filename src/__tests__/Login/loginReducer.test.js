import { loginReducer } from '../../main/Login/loginReducer'
import * as TYPES from '../../main/storage/actions'

describe('loginReducer', () => {
  describe('when action is SUCCESSFUL_LOGIN', () => {
    it('should return true', () => {
      const state = null
      const action = {
        type: TYPES.SUCCESSFUL_LOGIN,
      }
      expect(loginReducer(state, action)).toEqual(true)
    })
  })
  describe('when acion is default', () => {
    it('should return state', () => {
      const state = null
      const action = {
        type: '',
      }
      expect(loginReducer(state, action)).toEqual(null)
    })
  })
})
