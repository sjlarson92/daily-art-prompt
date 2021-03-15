import { shallow } from 'enzyme'
import React from 'react'
import { useSelector } from 'react-redux'
import Comment from '../../main/Comment/Comment'

jest.mock('react-redux')

const user = {
  id: 2,
  email: 'SomeUser',
}
const defaultProps = {
  comment: { id: 1, user },
  onDelete: jest.fn(),
  onEdit: jest.fn(),
}
const mockState = {
  user,
}

const mockState2 = {
  user: {
    id: 7,
  },
}
describe('<Comment />', () => {
  describe('when comment.user.id is equal to userid', () => {
    it('renders comment-icon-container', () => {
      useSelector.mockImplementation(callback => callback(mockState))
      const wrapper = shallow(<Comment {...defaultProps} />)
      expect(wrapper.find({ testid: 'iconContainer' })).toHaveLength(1)
    })
    describe('Delete Icon', () => {
      it('call onDelete with correct params when clicked', () => {
        jest.clearAllMocks()
        useSelector.mockImplementation(callback => callback(mockState))
        const wrapper = shallow(<Comment {...defaultProps} />)
        wrapper.find({ testid: 'deleteButton' }).simulate('click')
        expect(defaultProps.onDelete).toHaveBeenCalledWith(
          defaultProps.comment.id,
        )
      })
    })
    describe('Edit Icon', () => {
      jest.clearAllMocks()
      useSelector.mockImplementation(callback => callback(mockState))
      const wrapper = shallow(<Comment {...defaultProps} />)
      wrapper.find({ testid: 'editButton' }).simulate('click')
      expect(defaultProps.onEdit).toHaveBeenCalled()
    })
  })
  describe('when comment.user.id is NOT equal to userid', () => {
    it('does NOT render comment-icon-container', () => {
      useSelector.mockImplementation(callback => callback(mockState2))
      const wrapper = shallow(<Comment {...defaultProps} />)
      expect(wrapper.find({ testid: 'iconContainer' })).toHaveLength(0)
    })
  })
})
