import { shallow } from 'enzyme'
import React from 'react'
import UserCardFooter from '../../main/User/UserCardFooter'

describe('UserCardFooter', () => {
  const linkTo = '/someLink'
  const linkQuestion = 'What is your favorite color?'
  const linkText = 'oh the weather outside is frightful'
  const wrapper = shallow(
    <UserCardFooter
      linkQuestion={linkQuestion}
      linkTo={linkTo}
      linkText={linkText}
    />,
  )
  it('render linkQuestion properly', () => {
    expect(wrapper.find({ testid: 'linkQuestionDiv' }).text()).toContain(
      linkQuestion,
    )
  })
  it('set linkTo value properly', () => {
    expect(wrapper.find('Link').prop('to')).toEqual(linkTo)
  })
  it('render linkText properly', () => {
    expect(wrapper.find('Link').text()).toEqual(linkText)
  })
})
