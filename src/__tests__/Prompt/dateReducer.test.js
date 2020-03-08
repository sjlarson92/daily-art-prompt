import moment from 'moment'
import * as TYPES from '../../main/storage/actions'
import { dateReducer } from '../../main/Prompt/dateReducer'

describe('dateReducer', () => {
  describe('when action.type is SET_INITIAL_DATE', () => {
    it('should return correct date with correct format', () => {
      const action = {
        type: TYPES.SET_INITIAL_DATE,
      }
      expect(dateReducer(null, action)).toEqual(moment().format('YYYY-MM-DD'))
    })
  })
  describe('when action.type is UPDATE_DATE', () => {
    it('should return the date from action payload', () => {
      const action = {
        type: TYPES.UPDATE_DATE,
        payload: {
          date: '2020-01-12',
        },
      }
      expect(dateReducer(null, action)).toEqual('2020-01-12')
    })
  })

  describe('when default case occurs', () => {
    it('should return state', () => {
      const state = '2020-01-11'
      const action = {
        type: '',
      }
      expect(dateReducer(state, action)).toEqual(state)
    })
  })
})
