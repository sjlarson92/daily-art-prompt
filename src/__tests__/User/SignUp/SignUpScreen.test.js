import React from 'react'
import { shallow } from 'enzyme/'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SignUpScreen from '../../../main/User/SignUp/SignUpScreen'
import { createUser } from '../../../main/User/userRequests'
import * as TYPES from '../../../main/storage/actions'

jest.mock('../../../main/User/userRequests')
jest.mock('react-redux')
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))

describe('SignUpScreen', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallow(<SignUpScreen />)
  })

  describe('errorMessage', () => {
    describe('when errorMessage does NOT exist', () => {
      it('should not render errorMessage', () => {
        const errorMessage = null
        useSelector.mockReturnValueOnce(errorMessage)
        wrapper = shallow(<SignUpScreen />)
        expect(
          Object.entries(wrapper.find({ 'data-testid': 'errorMessage' })),
        ).toHaveLength(0)
      })
    })
    describe('when errorMessage exists', () => {
      it('should render errorMessage', () => {
        const errorMessage = 'errorMessage'
        useSelector.mockReturnValueOnce(errorMessage)
        wrapper = shallow(<SignUpScreen />)
        expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
          'errorMessage',
        )
      })
    })
  })

  describe('when submit is clicked', () => {
    it('should dispatch action with correct type and payload', () => {
      const dispatch = jest.fn()
      useDispatch.mockReturnValue(dispatch)
      const history = jest.fn()
      useHistory.mockReturnValue(history)
      const email = 'sjlarson92@gmail.com'
      const password = '123'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
      wrapper.find({ 'data-testid': 'submitButton' }).simulate('click')
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_ERROR_MESSAGE,
        payload: {
          error: null,
        },
      })
    })
    it('should call createUser with correct params', () => {
      const dispatch = jest.fn()
      useDispatch.mockReturnValue(dispatch)
      const history = jest.fn()
      useHistory.mockReturnValue(history)
      const email = 'sjlarson92@gmail.com'
      const password = '123'
      wrapper
        .find({ 'data-testid': 'emailInput' })
        .simulate('change', { target: { value: email } })
      wrapper
        .find({ 'data-testid': 'passwordInput' })
        .simulate('change', { target: { value: password } })
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
