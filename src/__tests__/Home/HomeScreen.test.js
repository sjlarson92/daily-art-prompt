import React from 'react'
import { shallow } from 'enzyme'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import HomeScreen from '../../main/Home/HomeScreen'
import { MainFeedScreen } from '../../main/Home/MainFeedScreen'

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

  it('should return correct component if user is loggedIn', () => {
    useSelector.mockReturnValue(true)
    const wrapper = shallow(<HomeScreen />)
    expect(wrapper.find({ 'data-testid': 'dailyArtPromptApp' })).toHaveLength(1)
  })
})
