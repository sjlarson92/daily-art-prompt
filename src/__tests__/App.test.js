import React from 'react'
import { shallow } from 'enzyme'
import App from '../main/App'
import HomeScreen from '../main/Home/HomeScreen'
import LoginScreen from '../main/User/Login/LoginScreen'
import ErrorScreen from '../main/User/Login/ErrorScreen'
import SignUpScreen from '../main/User/SignUp/SignUpScreen'
import PromptImagesScreen from '../main/Home/PromptImagesScreen'

describe('<App>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  describe('<Route> for HomeScreen', () => {
    it('has the correct exact prop', () => {
      expect(wrapper.find({ testid: 'home' }).prop('exact')).toBeTruthy()
    })

    it('has the correct path prop', () => {
      expect(wrapper.find({ testid: 'home' }).prop('path')).toEqual('/')
    })

    it('has the correct component prop', () => {
      expect(wrapper.find({ testid: 'home' }).prop('component')).toEqual(
        HomeScreen,
      )
    })
  })
  describe('<Route> for Login', () => {
    it('has correct path prop', () => {
      expect(wrapper.find({ testid: 'login' }).prop('path')).toEqual('/login')
    })
    it('has correct component prop', () => {
      expect(wrapper.find({ testid: 'login' }).prop('component')).toEqual(
        LoginScreen,
      )
    })
  })
  describe('<Route> for SignUp', () => {
    it('has correct path prop', () => {
      expect(wrapper.find({ testid: 'signUp' }).prop('path')).toEqual(
        '/sign-up',
      )
    })
    it('should have correct component', () => {
      expect(wrapper.find({ testid: 'signUp' }).prop('component')).toEqual(
        SignUpScreen,
      )
    })
  })
  describe('<Route> for PromptImageScreen', () => {
    it('has correct path prop', () => {
      expect(wrapper.find({ testid: 'promptScreen' }).prop('path')).toEqual(
        '/prompt-images/:date',
      )
    })
    it('has correct component prop', () => {
      expect(
        wrapper.find({ testid: 'promptScreen' }).prop('component'),
      ).toEqual(PromptImagesScreen)
    })
  })

  describe('<Route> for ErrorScreen', () => {
    it('should have correct component', () => {
      expect(wrapper.find({ testid: 'error' }).prop('component')).toEqual(
        ErrorScreen,
      )
    })
  })
})
