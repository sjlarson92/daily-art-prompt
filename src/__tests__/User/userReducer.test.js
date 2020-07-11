import { userReducer } from '../../main/User/userReducer'
import * as TYPES from '../../main/storage/actions'

describe('userReducer', () => {
  describe('when action is LOGIN', () => {
    it('should return user with correct fields', () => {
      const state = null
      const action = {
        type: TYPES.LOGIN,
        payload: {
          email: 'someEmail@yourmom.com',
          id: 123,
        },
      }
      expect(userReducer(state, action)).toEqual({
        email: 'someEmail@yourmom.com',
        id: 123,
        isLoggedIn: true,
      })
    })
  })
  describe('when action is default', () => {
    it('should return state', function() {
      const state = null
      const action = {
        type: '',
      }
      expect(userReducer(state, action)).toEqual(null)
    })
  })
})
