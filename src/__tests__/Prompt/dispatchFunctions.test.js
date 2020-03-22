import * as TYPES from '../../main/storage/actions'
import {
  updateNextDateAction,
  updatePreviousDateAction,
} from '../../main/Prompt/dispatchFunctions'

const dispatch = jest.fn()

describe('updateNextDateAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call dispatch with correct params', () => {
    const getState = jest.fn().mockReturnValue({
      prompts: {
        '2020-01-17': 'napping is my favorite hobby',
        '2020-01-18': 'i am an object',
        '2020-01-19': 'i love tea',
      },
      date: '2020-01-18',
    })
    updateNextDateAction()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({
      type: TYPES.UPDATE_DATE,
      payload: {
        date: '2020-01-19',
      },
    })
  })
})

describe('updatePreviousDateAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call dispatch with correct params', () => {
    const getState = jest.fn().mockReturnValue({
      prompts: {
        '2020-01-18': 'napping is my favorite hobby',
        '2020-01-19': 'i am an object',
      },
      date: '2020-01-19',
    })
    updatePreviousDateAction()(dispatch, getState)
    expect(dispatch).toHaveBeenCalledWith({
      type: TYPES.UPDATE_DATE,
      payload: {
        date: '2020-01-18',
      },
    })
  })
})