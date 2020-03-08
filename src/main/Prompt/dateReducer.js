import moment from 'moment'
import * as TYPES from '../storage/actions'

export const dateReducer = (state = null, action) => {
  switch (action.type) {
    case TYPES.SET_INITIAL_DATE:
      return moment().format('YYYY-MM-DD')
    case TYPES.UPDATE_DATE:
      return action.payload.date
    default:
      return state
  }
}
