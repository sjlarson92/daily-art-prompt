import React from 'react'
import { shallow } from 'enzyme'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeScreen from '../../main/Home/HomeScreen'

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))
jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

describe('<HomeScreen>', () => {
  it('should redirect user to /login when not loggedIn', () => {
    const history = {
      push: jest.fn(),
    }
    useHistory.mockReturnValue(history)
    useSelector.mockReturnValue(false)
    shallow(<HomeScreen />)
    expect(history.push).toHaveBeenCalledWith('/login')
  })

  it('should return null', () => {
    const history = {
      push: jest.fn(),
    }
    useHistory.mockReturnValue(history)
    useSelector.mockReturnValue(false)
    expect(shallow(<HomeScreen />).type()).toBeNull()
  })

  it('should NOT return MainFeedScreen', () => {
    const history = {
      push: jest.fn(),
    }
    useHistory.mockReturnValue(history)
    useSelector.mockReturnValue(false)
    const wrapper = shallow(<HomeScreen />)
    expect(wrapper.find({ 'data-testid': 'mainFeedScreen' })).toHaveLength(0)
  })

  it('should return correct component if user is loggedIn', () => {
    useSelector.mockReturnValue({ isLoggedIn: true })
    const wrapper = shallow(<HomeScreen />)
    expect(wrapper.find({ 'data-testid': 'mainFeedScreen' })).toHaveLength(1)
  })
})
