import { useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import ImageGallery from '../../main/Image/ImageGallery'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
}))
jest.mock('../../main/Image/ImageLayout')

const images = [
  {
    id: 1,
    promptId: 6,
    liked: false,
  },
  {
    id: 2,
    promptId: 5,
    liked: true,
  },
  {
    id: 3,
    promptId: 4,
    liked: false,
  },
]

const mockState = {
  images,
  currentPromptId: images[2].promptId,
}

describe('ImageGallery', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    wrapper = shallow(<ImageGallery />)
  })
  describe('<ImageLayout>', () => {
    describe('when there are images and promptId equals image.promptId', () => {
      it('renders imageLayout for each image in array', () => {
        expect(wrapper.find({ 'data-className': 'imageLayout' })).toHaveLength(
          1,
        )
      })
      describe('image prop', () => {
        it('should pass image obj to component', () => {
          expect(
            wrapper
              .find({ 'data-testid': `image-${images[2].id}` })
              .prop('image'),
          ).toEqual(images[2])
        })
      })
    })
    describe('when there are NO images', () => {
      it('should not render ImageLayout', () => {
        jest.resetAllMocks()
        useSelector.mockReturnValue([])
        wrapper = shallow(<ImageGallery />)
        expect(wrapper.find({ 'data-className': 'imageLayout' })).toHaveLength(
          0,
        )
      })
    })
  })
})
