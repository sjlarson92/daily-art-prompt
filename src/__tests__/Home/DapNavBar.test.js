import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import axios from 'axios'
import React from 'react'
import { useHistory } from 'react-router-dom'
import * as TYPES from '../../main/storage/actions'
import DapNavBar from '../../main/Home/DapNavBar'

jest.mock('react-redux')
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}))
jest.mock('../../main/Image/ImageLayout')
jest.mock('axios')

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const history = {
  push: jest.fn(),
}

const mockState = {
  user,
}
const dispatch = jest.fn()

describe('DapNavBar', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValueOnce(dispatch)
    useHistory.mockReturnValueOnce(history)
    wrapper = shallow(<DapNavBar />)
  })
  describe('DapLogo', () => {
    it('call history.push with correct param', () => {
      wrapper.find('img').simulate('click')
      expect(history.push).toHaveBeenCalledWith('/')
    })
  })
  describe('NavDropDown', () => {
    it('should render correct user for title', () => {
      expect(wrapper.find({ id: 'nav-user-dropdown' }).prop('title')).toEqual(
        user.email,
      )
    })
    describe('Add Prompts Button', () => {
      describe('when user has role GODLIKE', () => {
        const godlikeUser = {
          id: 'some id',
          email: 'SomeUser',
          role: 'GODLIKE',
        }
        beforeEach(() => {
          jest.resetAllMocks()
          useSelector.mockImplementation(callback =>
            callback({ user: godlikeUser }),
          )
        })
        it('should render with correct text', () => {
          const newWrapper = shallow(<DapNavBar />)
          expect(newWrapper.find({ testid: 'promptButton' }).text()).toEqual(
            'Add Prompts',
          )
        })
        it('calls prompts api when clicked', () => {
          const newWrapper = shallow(<DapNavBar />)
          newWrapper.find({ testid: 'promptButton' }).simulate('click')
          expect(axios.post).toHaveBeenCalledWith(
            `${GATEWAY_URL}/api/prompts?userId=${godlikeUser.id}`,
          )
        })
      })
      describe('when user has role FEEDER', () => {
        it('should not render add prompt button', () => {
          jest.resetAllMocks()
          const feederUser = {
            id: 'some id',
            email: 'SomeUser',
            role: 'FEEDER',
          }
          useSelector.mockImplementation(callback =>
            callback({ user: feederUser }),
          )
          const newWrapper = shallow(<DapNavBar />)
          expect(newWrapper.find({ testid: 'promptButton' })).toHaveLength(0)
        })
      })
    })
    describe('Logout Button', () => {
      it('should render with correct text', () => {
        expect(wrapper.find({ 'data-testid': 'logoutButton' }).text()).toEqual(
          'Logout',
        )
      })
      it('dispatch with correct param when clicked', () => {
        wrapper.find({ 'data-testid': 'logoutButton' }).simulate('click')
        expect(dispatch).toHaveBeenCalledWith({ type: TYPES.LOGOUT })
      })
    })
  })
})
