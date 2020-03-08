import React from 'react'
import { shallow } from 'enzyme'
import App from '../main/App'
import HomeScreen from '../main/Home/HomeScreen'
import LoginScreen from '../main/Login/LoginScreen'
import ErrorScreen from '../main/Login/ErrorScreen'

describe('<App>', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })
  describe('<Route> at 0', () => {
    it('has the correct exact prop', () => {
      expect(
        wrapper
          .find('Route')
          .at(0)
          .prop('exact'),
      ).toBeTruthy()
    })

    it('has the correct path prop', () => {
      expect(
        wrapper
          .find('Route')
          .at(0)
          .prop('path'),
      ).toEqual('/')
    })

    it('has the correct component prop', () => {
      expect(
        wrapper
          .find('Route')
          .at(0)
          .prop('component'),
      ).toEqual(HomeScreen)
    })
  })
  describe('<Route> at 1', () => {
    it('has correct path prop', () => {
      expect(
        wrapper
          .find('Route')
          .at(1)
          .prop('path'),
      ).toEqual('/login')
    })
    it('has correct component prop', () => {
      expect(
        wrapper
          .find('Route')
          .at(1)
          .prop('component'),
      ).toEqual(LoginScreen)
    })
  })
  describe('<Route> at 2', () => {
    it('should have correct component', () => {
      expect(
        wrapper
          .find('Route')
          .at(2)
          .prop('component'),
      ).toEqual(ErrorScreen)
    })
  })
})
