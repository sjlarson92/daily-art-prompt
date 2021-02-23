import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { mount, shallow } from 'enzyme'
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

describe('<ImageLayout>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
  })
  describe('on Render', () => {
    it('make api call with correct params', () => {
      axios.get.mockResolvedValue()
      mount(<ImageLayout {...defaultProps} />)
      expect(axios.get).toHaveBeenCalledWith(
        `${GATEWAY_URL}/api/comments?imageId=${defaultProps.image.id}`,
      )
    })
    it('renders comments from api call', () => {
      axios.get.mockResolvedValue({ data: { id: 1 } })
      const wrapper = mount(<ImageLayout {...defaultProps} />)
      setTimeout(() => {
        expect(wrapper.find({ testid: 'comment-1' })).toHaveLength(1)
      }, 2000)
    })
  })
  describe('<CommentLayout />', () => {
    describe('onDelete', () => {
      it('makes axios call with correct params', () => {
        const commentId = 'some id'
        axios.get.mockResolvedValue({ data: { id: commentId } })
        axios.delete.mockResolvedValue()
        const wrapper = mount(<ImageLayout {...defaultProps} />)
        setTimeout(() => {
          wrapper.find({ testid: `comment-${commentId}` }).simulate('delete')
          expect(axios.delete).toHaveBeenCalledWith(
            `${GATEWAY_URL}/api/comments/${commentId}`,
          )
        }, 2000)
      })
      it('no longer renders comment', () => {
        const commentId = 'some id'
        axios.get.mockResolvedValue({ data: { id: commentId } })
        axios.delete.mockResolvedValue()
        const wrapper = mount(<ImageLayout {...defaultProps} />)
        setTimeout(() => {
          wrapper.find({ testid: `comment-${commentId}` }).simulate('delete')
          expect(wrapper.find({ testid: `comment-${commentId}` })).toHaveLength(
            0,
          )
        }, 2000)
      })
    })
  })
  describe('AddComment', () => {
    describe('when enter is pressed', () => {
      it('makes axios call with correct params', () => {
        const comment = 'some comment'
        const requestBody = {
          imageId: defaultProps.image.id,
          userId: user.id,
          text: comment,
        }
        axios.post.mockResolvedValue()
        const newWrapper = shallow(<ImageLayout {...defaultProps} />)
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: comment } })
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 13 })
        expect(axios.post).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/comments`,
          requestBody,
        )
      })
      it('renders new comment', async () => {
        axios.post.mockResolvedValue({ data: { id: 1 } })
        const newWrapper = shallow(<ImageLayout {...defaultProps} />)
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: 'comment' } })
        await newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 13 })
        expect(newWrapper.find({ testid: 'comment-1' })).toHaveLength(1)
        // expect comments.length == 2
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
