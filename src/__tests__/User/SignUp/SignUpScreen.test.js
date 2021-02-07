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

  beforeEach(() => {
    jest.clearAllMocks()
    useDispatch.mockReturnValue(dispatch)
    useHistory.mockReturnValue(history)
    wrapper = shallow(<SignUpScreen />)
  })

  describe('Alert', () => {
    describe('when createUser is successful', () => {
      it('should not render alert', async () => {
        createUser.mockResolvedValue()
        wrapper = shallow(<SignUpScreen />)
        await wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
        expect(wrapper.find({ 'data-testid': 'errorMessage' })).toHaveLength(0)
      })
    })
    describe('when createUser throws an error', () => {
      describe('when error.response.status is 409', () => {
        it('should render alert with correct message', async () => {
          const errorMessage = 'rawr'
          const error = {
            response: { status: 409, headers: { message: errorMessage } },
          }
          createUser.mockRejectedValue(error)
          wrapper = shallow(<SignUpScreen />)
          await wrapper
            .find({ 'data-testid': 'submitButton' })
            .simulate('click')
          expect(
            wrapper.find({ 'data-testid': 'errorMessage' }).text(),
          ).toEqual(errorMessage)
        })
      })
      it('should render alert', async () => {
        const error = { response: { status: 400 } }
        createUser.mockRejectedValue(error)
        wrapper = shallow(<SignUpScreen />)
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
        createUser.mockResolvedValue()
        const newWrapper = shallow(<SignUpScreen />)
        newWrapper.find({ testid: 'emailInput' }).simulate('keyPress', 'Enter')
        expect(createUser).toHaveBeenCalledWith(dispatch, history, null, null)
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
      const email = 'sjlarson92@gmail.com'
      const password = '123'
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
