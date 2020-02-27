import moment from 'moment'
import * as TYPES from './actions'

export const updateNextDateAction = () => (dispatch, getState) => {
  const nextDate = moment(getState().date)
    .add(1, 'day')
    .format('YYYY-MM-DD')
  dispatch({
    type: TYPES.UPDATE_DATE,
    payload: {
      date: nextDate,
    },
  })
}

export const updatePreviousDateAction = () => (dispatch, getState) => {
  const previousDate = moment(getState().date)
    .subtract(1, 'day')
    .format('YYYY-MM-DD')
  dispatch({
    type: TYPES.UPDATE_DATE,
    payload: {
      date: previousDate,
    },
  })
}
