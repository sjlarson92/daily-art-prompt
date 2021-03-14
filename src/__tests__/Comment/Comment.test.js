import { shallow } from 'enzyme'
import React from 'react'
import Comment from '../../main/Comment/Comment'

const defaultProps = {
  comment: { id: 1, user: { id: 2 } },
  onDelete: jest.fn(),
  onEdit: jest.fn(),
}
describe('<Comment />', () => {
  describe('Delete Icon', () => {
    it('call onDelete with correct params when clicked', () => {
      const wrapper = shallow(<Comment {...defaultProps} />)
      wrapper.find({ testid: 'deleteButton' }).simulate('click')
      expect(defaultProps.onDelete).toHaveBeenCalledWith(
        defaultProps.comment.id,
      )
    })
  })
  describe('Edit Icon', () => {
    const wrapper = shallow(<Comment {...defaultProps} />)
    wrapper.find({ testid: 'editButton' }).simulate('click')
    expect(defaultProps.onEdit).toHaveBeenCalled()
  })
})
