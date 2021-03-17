import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import ImageLayout from '../../main/Image/ImageLayout'
import {
  deleteImageAction,
  updateLikeImageAction,
} from '../../main/Image/imageApi'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('../../main/Image/imageApi')

const user = {
  id: 1,
  email: 'SomeUser',
}

const mockState = {
  user,
}

const defaultProps = {
  image: {
    id: 'some id',
    userId: user.id,
  },
}

const dispatch = jest.fn()

describe('<ImageLayout>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<ImageLayout {...defaultProps} />)
  })
  describe('Image', () => {
    describe('when double clicked', () => {
      it('calls updateLikeImageAction with correct params', () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        wrapper.find('Image').simulate('doubleClick')
        expect(updateLikeImageAction).toHaveBeenCalledWith(
          updatedImage,
          dispatch,
        )
      })
    })
  })
  describe('LikeImageIcon', () => {
    describe('when clicked', () => {
      it('calls updateLikeImageAction with correct params', () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        wrapper.find('FontAwesomeIcon').simulate('click')
        expect(updateLikeImageAction).toHaveBeenCalledWith(
          updatedImage,
          dispatch,
        )
      })
    })
  })
  describe('DeleteImageIcon', () => {
    describe('when image.userId is equal to userId', () => {
      it('renders DeleteImageDropdown', () => {
        expect(wrapper.find({ testid: 'deleteImageDropdown' })).toHaveLength(1)
      })
      it('calls deleteImageAction with correct params when clicked', async () => {
        await wrapper.find({ testid: 'deleteImageDropdown' }).simulate('click')
        wrapper.find({ testid: 'deleteImage' }).simulate('click')
        expect(deleteImageAction).toHaveBeenCalledWith(
          defaultProps.image.id,
          dispatch,
        )
      })
    })
    describe('when image.userId is NOT equal to userId', () => {
      it('does NOT render DeleteImageDropdown', () => {
        const modifiedProps = {
          image: {
            id: 'some id',
            userId: 7,
          },
        }
        const newWrapper = shallow(<ImageLayout {...modifiedProps} />)
        expect(newWrapper.find({ testid: 'deleteImageDropdown' })).toHaveLength(
          0,
        )
      })
    })
  })
})
