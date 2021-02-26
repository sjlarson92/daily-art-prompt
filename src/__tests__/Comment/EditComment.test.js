import { shallow } from 'enzyme'
import React from 'react'
import EditComment from '../../main/Comment/EditComment'

const defaultProps = {
  comment: {
    text: 'comment text',
  },
  onUpdate: jest.fn(),
  onCancel: jest.fn(),
}
describe('<EditComment />', () => {
  describe('input', () => {
    it('call onUpdate with correct params onKeyDown', () => {
      const wrapper = shallow(<EditComment {...defaultProps} />)
      wrapper.find('input').simulate('keyDown', 'event')
      expect(defaultProps.onUpdate).toHaveBeenCalledWith(
        'event',
        defaultProps.comment,
      )
    })
  })
  describe('button', () => {
    it('calls onCancel when clicked', () => {
      const wrapper = shallow(<EditComment {...defaultProps} />)
      wrapper.find('button').simulate('click')
      expect(defaultProps.onCancel).toHaveBeenCalled()
    })
  })
})
