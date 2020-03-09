import { loginReducer } from '../../main/Login/loginReducer'
import * as TYPES from '../../main/storage/actions'

describe('loginReducer', () => {
  describe('when action is LOGIN', () => {
    it('should return true', () => {
      const state = null
      const action = {
        type: TYPES.LOGIN,
      }
      expect(loginReducer(state, action)).toEqual(true)
    })
  })
  describe('when action is LOGOUT', () => {
    it('should return false', () => {
      const state = true
      const action = {
        type: TYPES.LOGOUT,
      }
      expect(loginReducer(state, action)).toEqual(false)
    })
  })
  describe('when action is default', () => {
    it('should return state', () => {
      const state = null
      const action = {
        type: '',
      }
      expect(loginReducer(state, action)).toEqual(null)
    })
  })
})
