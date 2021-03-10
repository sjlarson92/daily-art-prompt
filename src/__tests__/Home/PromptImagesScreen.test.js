import React from 'react'
import { shallow } from 'enzyme'
import { useLocation, useParams } from 'react-router-dom'
import PromptImagesScreen from '../../main/Home/PromptImagesScreen'

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
  useParams: jest.fn(),
}))
jest.mock('../../main/Prompt/PromptLayout', () => () => <div />)

const date = '2021-01-11'

const location = {
  pathname: 'fake/pathname',
}

describe('<PromptImagesScreen>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useParams.mockReturnValueOnce({ date })
    useLocation.mockReturnValueOnce(location)
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
