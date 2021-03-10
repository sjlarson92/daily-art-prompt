import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import { useLocation } from 'react-router-dom'
import React from 'react'
import ImageGallery from '../../main/Image/ImageGallery'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('react-router-dom', () => ({
  useLocation: jest.fn(),
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
const user = { id: 1 }

const mockState = {
  user,
  images,
  prompt: { id: images[2].promptId },
}
const location = {
  pathname: 'fake/pathname',
}

const dispatch = jest.fn()

describe('ImageGallery', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValueOnce(dispatch)
    useLocation.mockReturnValueOnce(location)
    wrapper = shallow(<ImageGallery />)
  })
  describe('<ImageLayout>', () => {
    describe('when there are images', () => {
      it('renders imageLayout for each image in array', () => {
        expect(wrapper.find({ 'data-className': 'imageLayout' })).toHaveLength(
          3,
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
        useLocation.mockReturnValue(location)
        wrapper = shallow(<ImageGallery />)
        expect(wrapper.find({ 'data-className': 'imageLayout' })).toHaveLength(
          0,
        )
      })
    })
  })
})
