import React from 'react'
import { shallow } from 'enzyme'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import LoginScreen from '../../main/Login/LoginScreen'
import * as TYPES from '../../main/storage/actions'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))
jest.mock('react-redux')

describe('LoginScreen', () => {
  let wrapper
  const history = {
    push: jest.fn(),
  }
  const dispatch = jest.fn()
  useDispatch.mockReturnValue(dispatch)
  useHistory.mockReturnValue(history)
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallow(<LoginScreen />)
  })

  describe('header', () => {
    it('should render correct header', () => {
      expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual(
        'Login Screen',
      )
    })
  })

  describe('when email and password are correct', () => {
    it('should redirect user to /', () => {
      const email = 'sjlarson92@gmail.com'
      const password = '123'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
      wrapper.find({ 'data-testid': 'loginButton' }).simulate('click')
      expect(history.push).toHaveBeenCalledWith('/')
    })

    it('should call dispatch with correct params', () => {
      const email = 'sjlarson92@gmail.com'
      const password = '123'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
      wrapper.find({ 'data-testid': 'loginButton' }).simulate('click')
      expect(dispatch).toHaveBeenCalledWith({ type: TYPES.SUCCESSFUL_LOGIN })
    })
  })

  describe('when email or password are incorrect', () => {
    it('should set ErrorMessage to render', () => {
      const email = 'wrong@incorrect.com'
      const password = 'incorrectPassword'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
      wrapper.find({ 'data-testid': 'loginButton' }).simulate('click')
      expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
        'Login Failed. Please try again.',
      )
    })
  })
})
