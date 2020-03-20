import React from 'react'
import { shallow } from 'enzyme/'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SignUpScreen from '../../main/SignUp/SignUpScreen'
import { createUser } from '../../main/SignUp/createUserApi'

jest.mock('../../main/SignUp/createUserApi')
jest.mock('react-redux')
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))

describe('SignUpScreen', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    const dispatch = jest.fn()
    useDispatch.mockReturnValue(dispatch)
    const history = jest.fn()
    useHistory.mockReturnValue(history)
    wrapper = shallow(<SignUpScreen />)
    // TODO: Fix issue with async mockReturnValue!
  })

  it('render header with correct text', () => {
    expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual('Sign Up')
  })
  describe('errorMessage', () => {
    describe('when errorMessage does NOT exist', () => {
      it('should not render errorMessage', () => {
        const errorMessage = ''
        useSelector.mockReturnValueOnce(errorMessage)
        expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
          '',
        )
      })
    })
    describe('when errorMessage exists', () => {
      it('should render errorMessage', () => {
        const errorMessage = 'errorMessage'
        useSelector.mockReturnValueOnce(errorMessage)
        expect(wrapper.find({ 'data-testid': 'errorMessage' }).text()).toEqual(
          'errorMessage',
        )
      })
    })
  })

  describe('when submit is clicked', () => {
    it('should call createUser with correct params', () => {
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
