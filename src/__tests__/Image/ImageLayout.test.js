import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import axios from 'axios'
import ImageLayout from '../../main/Image/ImageLayout'
import { GATEWAY_URL } from '../../main/constants'
import * as TYPES from '../../main/storage/actions'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('axios')

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const mockState = {
  user,
}

const defaultProps = {
  image: {
    id: 'some id',
  },
}

const dispatch = jest.fn()

describe('<ImageLayout>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
  })
  describe('Image', () => {
    describe('when double clicked', () => {
      it('makes api call with correct params', () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        axios.put.mockResolvedValue({ data: updatedImage })
        const wrapper = shallow(<ImageLayout {...defaultProps} />)
        wrapper.find('Image').simulate('doubleClick')
        expect(axios.put).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/images/${defaultProps.image.id}`,
          updatedImage,
        )
      })
      it('dispatch with correct params', async () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        axios.put.mockResolvedValue({ data: updatedImage })
        const wrapper = shallow(<ImageLayout {...defaultProps} />)
        await wrapper.find('Image').simulate('doubleClick')
        expect(dispatch).toHaveBeenCalledWith({
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            updatedImage,
          },
        })
      })
    })
  })
  describe('LikeImageIcon', () => {
    describe('when clicked', () => {
      it('makes api call with correct params', () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        axios.put.mockResolvedValue({ data: updatedImage })
        const wrapper = shallow(<ImageLayout {...defaultProps} />)
        wrapper.find('FontAwesomeIcon').simulate('click')
        expect(axios.put).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/images/${defaultProps.image.id}`,
          updatedImage,
        )
      })
      it('dispatch with correct params', async () => {
        const updatedImage = {
          ...defaultProps.image,
          liked: !defaultProps.image.liked,
        }
        axios.put.mockResolvedValue({ data: updatedImage })
        const wrapper = shallow(<ImageLayout {...defaultProps} />)
        await wrapper.find('FontAwesomeIcon').simulate('click')
        expect(dispatch).toHaveBeenCalledWith({
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            updatedImage,
          },
        })
      })
    })
  })
})
