import React from 'react'
import axios from 'axios'
import { mount, shallow } from 'enzyme'
import { useSelector } from 'react-redux'
import { act } from 'react-dom/test-utils'
import { GATEWAY_URL } from '../../main/constants'
import CommentContainer from '../../main/Comment/CommentContainer'
import { waitForComponentToMount } from '../../setupTests'

jest.mock('react-redux')

jest.mock('axios')

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const mockState = {
  user,
}

const comment = {
  id: 1,
  text: 'comment',
}

const defaultProps = {
  imageId: 1,
}

describe('<CommentContainer/>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
  })
  describe('on Render', () => {
    it('make api call with correct params', async () => {
      axios.get.mockResolvedValue({ data: [] })
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      expect(axios.get).toHaveBeenCalledWith(
        `${GATEWAY_URL}/api/comments?imageId=${defaultProps.imageId}`,
      )
    })
    it('renders comments from api call', async () => {
      axios.get.mockResolvedValue({ data: { id: 1 } })
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      setTimeout(() => {
        expect(wrapper.find({ testid: 'comment-1' })).toHaveLength(1)
      }, 2000)
    })
  })

  describe('AddComment', () => {
    describe('when enter is pressed', () => {
      it('makes axios call with correct params', async () => {
        const text = 'some comment'
        const requestBody = {
          imageId: defaultProps.imageId,
          userId: user.id,
          text,
        }
        axios.post.mockResolvedValue({ data: comment })
        const newWrapper = shallow(<CommentContainer {...defaultProps} />)
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: text } })
        await newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 13 })
        expect(axios.post).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/comments`,
          requestBody,
        )
      })
      it('render comments with new comment', async () => {
        const commentId = 'some id'
        axios.get.mockResolvedValue({ data: { id: commentId } })
        axios.post.mockResolvedValue({ data: { id: 2 } })
        const wrapper = mount(<CommentContainer {...defaultProps} />)
        await waitForComponentToMount(wrapper)
        setTimeout(() => {
          wrapper
            .find({ testid: 'commentInputBox' })
            .simulate('change', { target: { value: 'text' } })
          wrapper
            .find({ testid: 'commentInputBox' })
            .simulate('keyDown', { keyCode: 13 })
          expect(wrapper.find({ testid: `comment-${commentId}` })).toHaveLength(
            2,
          )
        }, 2000)
      })
    })
    describe('when enter is NOT pressed', () => {
      it('does not make axios call', () => {
        const text = 'some comment'
        const newWrapper = shallow(<CommentContainer {...defaultProps} />)
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('change', { target: { value: text } })
        newWrapper
          .find({ testid: 'commentInputBox' })
          .simulate('keyDown', { keyCode: 1 })
        expect(axios.post).not.toHaveBeenCalled()
      })
    })
  })

  describe('UpdateComment', () => {
    it('makes axios call with correct params', async () => {
      const updatedText = 'updated comment'
      const updatedComment = { ...comment, text: updatedText }
      axios.get.mockResolvedValue({ data: [comment] })
      axios.put.mockResolvedValue({ data: updatedComment })
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      await act(async () => {
        await wrapper
          .find({ testid: `show-comment-${comment.id}` })
          .prop('onEdit')()
        wrapper.update()
        wrapper.find({ testid: `edit-comment-${comment.id}` }).prop('onUpdate')(
          { keyCode: 13, target: { value: updatedText } },
          comment,
        )
      })
      wrapper.update()
      expect(axios.put).toHaveBeenCalledWith(
        `${GATEWAY_URL}/api/comments/${comment.id}`,
        updatedComment,
      )
    })
    it('renders comments with updated comment', async () => {
      const updatedText = 'updated comment'
      const updatedComment = { ...comment, text: updatedText }
      axios.get.mockResolvedValue({ data: [comment] })
      axios.put.mockResolvedValue({ data: updatedComment })
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      await act(async () => {
        await wrapper
          .find({ testid: `show-comment-${comment.id}` })
          .prop('onEdit')()
        wrapper.update()
        wrapper.find({ testid: `edit-comment-${comment.id}` }).prop('onUpdate')(
          { keyCode: 13, target: { value: updatedText } },
          comment,
        )
      })
      wrapper.update()
      expect(
        wrapper.find({ testid: `show-comment-${comment.id}` }).prop('comment'),
      ).toEqual(updatedComment)
    })
  })

  describe('DeleteComment', () => {
    it('makes axios call with correct params', async () => {
      axios.get.mockResolvedValue({ data: [comment] })
      axios.delete.mockResolvedValue()
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      setTimeout(() => {
        wrapper.find({ testid: `comment-${comment.id}` }).simulate('delete')
        expect(axios.delete).toHaveBeenCalledWith(
          `${GATEWAY_URL}/api/comments/${comment.id}`,
        )
      }, 2000)
    })
    it('no longer renders comment', async () => {
      const commentId = 'some id'
      axios.get.mockResolvedValue({ data: { id: commentId } })
      axios.delete.mockResolvedValue()
      const wrapper = mount(<CommentContainer {...defaultProps} />)
      await waitForComponentToMount(wrapper)
      setTimeout(() => {
        wrapper.find({ testid: `comment-${commentId}` }).simulate('delete')
        expect(wrapper.find({ testid: `comment-${commentId}` })).toHaveLength(0)
      }, 2000)
    })
  })
})
