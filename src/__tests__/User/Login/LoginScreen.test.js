import React from 'react'
import { shallow } from 'enzyme'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
        expect(newWrapper.find({ testid: 'signUpMessage' }).text()).toEqual(
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

  describe('Alert', () => {
    describe('when validateLogin throws an error', () => {
      it('should render alert', async () => {
        validateLogin.mockRejectedValue()
        const newWrapper = shallow(<LoginScreen />)
        await newWrapper
          .find({ 'data-testid': 'loginButton' })
          .simulate('click')
        expect(
          newWrapper.find({ 'data-testid': 'errorMessage' }).text(),
        ).toEqual('Incorrect email or password')
      })
    })
    describe('when validateLogin is successful', () => {
      it('should not render alert', async () => {
        jest.clearAllMocks()
        validateLogin.mockResolvedValue()
        const newWrapper = shallow(<LoginScreen />)
        await newWrapper
          .find({ 'data-testid': 'loginButton' })
          .simulate('click')
        expect(newWrapper.find({ 'data-testid': 'errorMessage' })).toHaveLength(
          0,
        )
      })
    })
  })

  describe('DapInput', () => {
    describe('when key is pressed', () => {
      describe('when the key is Enter', () => {
        it('calls validateLogin with correct params', () => {
          validateLogin.mockResolvedValue()
          const newWrapper = shallow(<LoginScreen />)
          newWrapper
            .find({ testid: 'emailInput' })
            .simulate('keyPress', 'Enter')
          expect(validateLogin).toHaveBeenCalledWith(
            dispatch,
            history,
            null,
            null,
          )
        })
      })
      describe('when key is not Enter', () => {
        it('should not call validateLogin', () => {
          wrapper.find({ testid: 'emailInput' }).simulate('keyPress', 'money')
          expect(validateLogin).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('Login Button', () => {
    describe('when clicked', () => {
      it('should call validateLogin with correct params', () => {
        const email = 'someEmail'
        const password = 'this is def not my password'
        wrapper.find({ testid: 'emailInput' }).simulate('change', email)
        wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
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

  describe('Sign Up Link', () => {
    it('should have link to signUp', () => {
      expect(wrapper.find({ testid: 'signUpLink' }).prop('linkTo')).toEqual(
        '/sign-up',
      )
    })
  })
})
