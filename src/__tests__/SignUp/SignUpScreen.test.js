import React from 'react'
import { shallow } from 'enzyme/'
import { useDispatch } from 'react-redux'
import SignUpScreen from '../../main/SignUp/SignUpScreen'
import { createUser } from '../../main/SignUp/createUserApi'

jest.mock('../../main/SignUp/createUserApi')
jest.mock('react-redux')

describe('SignUpScreen', () => {
  const dispatch = jest.fn()
  useDispatch.mockReturnValue(dispatch)
  it('render header with correct text', () => {
    const wrapper = shallow(<SignUpScreen />)
    expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual('Sign Up')
  })

  describe('when submit is clicked', () => {
    it('should call createUser with correct params', () => {
      const wrapper = shallow(<SignUpScreen />)
      const email = 'sjlarson92@gmail.com'
      const password = '123'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
      wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
      expect(createUser).toHaveBeenCalledWith(dispatch, email, password)
    })
  })
})
