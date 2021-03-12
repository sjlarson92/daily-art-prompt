import React from 'react'
import { shallow } from 'enzyme'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SignUpScreen from '../../../main/User/SignUp/SignUpScreen'
import { createUser } from '../../../main/User/userRequests'

jest.mock('../../../main/User/userRequests')
jest.mock('react-redux')
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))

describe('SignUpScreen', () => {
  let wrapper
  const history = jest.fn()
  const dispatch = jest.fn()
  const email = 'fake@gmail.com'
  const password = '123'

  beforeEach(() => {
    jest.clearAllMocks()
    useDispatch.mockReturnValue(dispatch)
    useHistory.mockReturnValue(history)
    wrapper = shallow(<SignUpScreen />)
  })

  describe('Alert', () => {
    describe('when email & password are null', () => {
      it('render alert', async () => {
        await wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
        expect(wrapper.find({ 'data-testid': 'errorMessage' })).toHaveLength(1)
      })
      it('render alert with correct message', async () => {
        await wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
        expect(
          wrapper
            .find({ 'data-testid': 'errorMessage' })
            .childAt(0)
            .text(),
        ).toEqual('Please enter email and password')
      })
    })
    describe('when createUser is successful', () => {
      it('should not render alert', async () => {
        wrapper.find({ testid: 'emailInput' }).simulate('change', email)
        wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
        createUser.mockResolvedValue()
        await wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
        expect(wrapper.find({ 'data-testid': 'errorMessage' })).toHaveLength(0)
      })
    })
    describe('when createUser throws an error', () => {
      describe('when error.response.status is 409', () => {
        it('should render alert with correct message', async () => {
          wrapper.find({ testid: 'emailInput' }).simulate('change', email)
          wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
          const errorMessage = 'rawr'
          const error = {
            response: { status: 409, headers: { message: errorMessage } },
          }
          createUser.mockRejectedValue(error)
          await wrapper
            .find({ 'data-testid': 'submitButton' })
            .simulate('click')
          expect(
            wrapper.find({ 'data-testid': 'errorMessage' }).text(),
          ).toEqual(errorMessage)
        })
      })
      it('should render alert', async () => {
        wrapper.find({ testid: 'emailInput' }).simulate('change', email)
        wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
        const error = { response: { status: 400 } }
        createUser.mockRejectedValue(error)
        await wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
        expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
          'An error occurred. Please try again.',
        )
      })
    })
  })

  describe('when key is pressed', () => {
    describe('when the key is Enter', () => {
      it('calls createUser with correct params', () => {
        wrapper.find({ testid: 'emailInput' }).simulate('change', email)
        wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
        createUser.mockResolvedValue()
        wrapper.find({ testid: 'emailInput' }).simulate('keyPress', 'Enter')
        expect(createUser).toHaveBeenCalledWith(
          dispatch,
          history,
          email,
          password,
        )
      })
    })
    describe('when key is not Enter', () => {
      it('should not call createUser', () => {
        wrapper.find({ testid: 'emailInput' }).simulate('keyPress', 'money')
        expect(createUser).not.toHaveBeenCalled()
      })
    })
  })

  describe('when submit is clicked', () => {
    it('should call createUser with correct params', () => {
      wrapper.find({ testid: 'emailInput' }).simulate('change', email)
      wrapper.find({ testid: 'passwordInput' }).simulate('change', password)
      wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
      expect(createUser).toHaveBeenCalledWith(
        dispatch,
        history,
        email,
        password,
      )
    })
  })
})
