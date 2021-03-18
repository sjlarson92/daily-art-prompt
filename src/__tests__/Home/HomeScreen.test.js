import React from 'react'
import { shallow } from 'enzyme'
import { useHistory } from 'react-router-dom'
import HomeScreen from '../../main/Home/HomeScreen'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))
jest.mock('react-redux')

const history = {
  push: jest.fn(),
}

describe('<HomeScreen>', () => {
  useHistory.mockReturnValueOnce(history)
  const wrapper = shallow(<HomeScreen />)
  describe('DapLogo', () => {
    it('call history.push with correct params when clicked', () => {
      wrapper.find({ testid: 'dapLogo' }).simulate('click')
      expect(history.push).toHaveBeenCalledWith('/')
    })
  })
  describe('Login', () => {
    it('has href with correct path', () => {
      expect(wrapper.find({ testid: 'login' }).prop('href')).toEqual('/login')
    })
  })
  describe('SignUp', () => {
    it('has href with correct path', () => {
      expect(wrapper.find({ testid: 'signUp' }).prop('href')).toEqual(
        '/sign-up',
      )
    })
  })
})
