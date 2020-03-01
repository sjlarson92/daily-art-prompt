import React from 'react'
import { shallow } from 'enzyme'
import Comment from '../../main/Comment/Comment'

const defaultProps = {
  comment: 'text',
}

describe('<Comment />', () => {
  it('should render with correct comment', () => {
    const wrapper = shallow(<Comment {...defaultProps} />)
    expect(
      wrapper
        .find({ 'data-testid': 'commentDiv' })
        .childAt(0)
        .text(),
    ).toEqual(defaultProps.comment)
  })
})
