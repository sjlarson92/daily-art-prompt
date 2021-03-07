import React from 'react'
import { shallow } from 'enzyme'
import { useSelector, useDispatch } from 'react-redux'
import PromptImagesScreen from '../../main/Home/PromptImagesScreen'

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

  describe('<div> for appContainer', () => {
    describe('<PromptLayout>', () => {
      it('should exist', () => {
        expect(wrapper.find({ testid: 'promptLayout' })).toHaveLength(1)
      })
    })
    describe('<ImageUploadModal>', () => {
      it('should exist', () => {
        expect(wrapper.find({ testid: 'imageUploadModal' })).toHaveLength(1)
      })
    })
    describe('<ImageGallery>', () => {
      it('should exist', () => {
        expect(wrapper.find({ testid: 'imageGallery' })).toHaveLength(1)
      })
    })
  })
})
