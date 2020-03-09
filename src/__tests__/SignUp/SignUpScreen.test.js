import React from 'react'
import { shallow } from 'enzyme/'
import SignUpScreen from '../../main/SignUp/SignUpScreen'

describe('SignUpScreen', () => {
  it('render header with correct text', () => {
    const wrapper = shallow(<SignUpScreen />)
    expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual('Sign Up')
  })
})
