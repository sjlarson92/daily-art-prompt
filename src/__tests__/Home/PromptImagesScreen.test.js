import React from 'react'
import { shallow, mount } from 'enzyme'
import { useSelector, useDispatch } from 'react-redux'
import PromptImagesScreen from '../../main/Home/PromptImagesScreen'
import { getImagesAction } from '../../main/Image/imageApi'
import { getPromptsAction } from '../../main/Prompt/promptsApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('../../main/Image/imageApi')
jest.mock('../../main/Prompt/promptsApi')
jest.mock('../../main/Prompt/PromptLayout', () => () => <div />)
jest.mock('axios')

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const mockState = {
  user,
}
const dispatch = jest.fn()

describe('<MainFeedScreen>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<PromptImagesScreen />)
  })
  describe('On Initial Render', () => {
    it('getImagesAction gets called with the correct param', () => {
      mount(<PromptImagesScreen />)
      expect(getImagesAction).toHaveBeenCalledWith(user.id)
    })
    it('dispatches getImagesAction', () => {
      mount(<PromptImagesScreen />)
      expect(dispatch).toHaveBeenCalledWith(getImagesAction())
    })
    it('dispatches getPromptsAction', () => {
      mount(<PromptImagesScreen />)
      expect(dispatch).toHaveBeenCalledWith(getPromptsAction())
    })
    it('dispatches SET_INITIAL_DATE', () => {
      mount(<PromptImagesScreen />)
      expect(dispatch).toHaveBeenCalledWith({ type: TYPES.SET_INITIAL_DATE })
    })
  })

  describe('<div> for appContainer', () => {
    describe('<PromptLayout>', () => {
      it('should exist', () => {
        expect(wrapper.find({ 'data-testid': 'promptLayout' })).toHaveLength(1)
      })
    })
  })
})