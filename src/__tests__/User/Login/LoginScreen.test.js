import React from 'react'
import { shallow } from 'enzyme'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import LoginScreen from '../../../main/User/Login/LoginScreen'
import { validateLogin } from '../../../main/User/Login/authRequests'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useLocation: jest.fn(),
}))
jest.mock('react-redux')
jest.mock('../../../main/User/Login/authRequests')

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
  describe('message', () => {
    describe('when there is a message', () => {
      it('render message', () => {
        const location = {
          state: {
            message: 'I am a message, render me!',
          },
        }
        useLocation.mockReturnValue(location)
        const newWrapper = shallow(<LoginScreen />)
        expect(newWrapper.find({ 'data-testid': 'message' }).text()).toEqual(
          'I am a message, render me!',
        )
      })
    })
    describe('where there is not a message', () => {
      it('does not render message', () => {
        const location = {
          state: {
            message: '',
          },
        }
        useLocation.mockReturnValue(location)
        wrapper = shallow(<LoginScreen />)
        expect(wrapper.find({ 'data-testid': 'message' })).toHaveLength(0)
      })
    })
  })

  describe('errorMessage', () => {
    describe('when there is an errorMessage', () => {
      it('should render errorMessage', () => {
        const errorMessage = 'error message'
        useSelector.mockReturnValue(errorMessage)
        const newWrapper = shallow(<LoginScreen />)
        expect(
          newWrapper.find({ 'data-testid': 'errorMessage' }).text(),
        ).toEqual('error message')
      })
    })
    describe('when there is not an errorMessage', () => {
      it('should not render errorMessage', () => {
        useSelector.mockReturnValue('')
        const newWrapper = shallow(<LoginScreen />)
        expect(
          newWrapper.find({ 'data-testid': 'errorMessage' }).text(),
        ).toEqual('')
      })
    })
  })

  describe('Login Button', () => {
    describe('when clicked', () => {
      it('should call validateLogin with correct params', () => {
        const email = 'someEmail'
        const password = 'this is def not my password'
        wrapper
          .find({ 'data-testid': 'emailInput' })
          .simulate('change', { target: { value: email } })
        wrapper
          .find({ 'data-testid': 'passwordInput' })
          .simulate('change', { target: { value: password } })
        wrapper.find({ 'data-testid': 'loginButton' }).simulate('click')
        expect(validateLogin).toHaveBeenCalledWith(
          dispatch,
          history,
          email,
          password,
        )
      })
    })
  })

  describe('Sign Up Button', () => {
    it('should redirect user to /sign-up when clicked', () => {
      wrapper.find({ 'data-testid': 'signUpButton' }).simulate('click')
      expect(history.push).toHaveBeenCalledWith('/sign-up')
    })
  })
})
