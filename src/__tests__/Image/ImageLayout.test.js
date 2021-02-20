import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import { GATEWAY_URL } from '../../main/constants'
import ImageLayout from '../../main/Image/ImageLayout'

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

describe('ImageLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
  })
  describe('AddComment', () => {
    describe('when enter is pressed', () => {
      it('makes axios call with correct params', async () => {
        const comment = 'some comment'
        const requestBody = {
          imageId: defaultProps.image.id,
          userId: user.id,
          text: comment,
        }
        axios.post.mockResolvedValue()
        const newWrapper = shallow(<ImageLayout {...defaultProps} />)
        await newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: comment } })
        await newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 13 })
        expect(axios.post).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/comments`,
          requestBody,
        )
      })
    })
    describe('when enter is NOT pressed', () => {
      it('does not make axios call', () => {
        const comment = 'some comment'
        const newWrapper = shallow(<ImageLayout {...defaultProps} />)
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: comment } })
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 1 })
        expect(axios.post).not.toHaveBeenCalled()
      })
    })
  })
})
