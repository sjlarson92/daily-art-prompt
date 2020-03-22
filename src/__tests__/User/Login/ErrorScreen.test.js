import React from 'react'
import { shallow } from 'enzyme'
import ErrorScreen from '../../../main/User/Login/ErrorScreen'

describe('ErrorScreen', () => {
  it('return correct error div', () => {
    const wrapper = shallow(<ErrorScreen />)
    expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
      'Error 404 Shit went down!',
    )
  })
})
