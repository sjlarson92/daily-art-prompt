import React from 'react'
import { shallow, mount } from 'enzyme'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import MainFeedScreen from '../../main/Home/MainFeedScreen'
import { getImagesAction } from '../../main/Image/imageApi'
import { getPromptsAction } from '../../main/Prompt/promptsApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('../../main/Image/imageApi')
jest.mock('../../main/Prompt/promptsApi')
jest.mock('../../main/Prompt/PromptLayout', () => () => <div />)
jest.mock('axios')

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const mockState = {
  user,
}
const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

describe('<MainFeedScreen>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<MainFeedScreen />)
  })
  describe('On Initial Render', () => {
    it('getImagesAction gets called with the correct param', () => {
      mount(<MainFeedScreen />)
      expect(getImagesAction).toHaveBeenCalledWith(user.id)
    })
    it('dispatches getImagesAction', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getImagesAction())
    })
    it('dispatches getPromptsAction', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getPromptsAction())
    })
    it('dispatches SET_INITIAL_DATE', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith({ type: TYPES.SET_INITIAL_DATE })
    })
  })

  describe('<div> for appContainer', () => {
    describe('user', () => {
      it('should render user email', () => {
        expect(wrapper.find({ 'data-testid': 'user' }).text()).toEqual(
          'SomeUser',
        )
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
          const newWrapper = shallow(<MainFeedScreen />)
          expect(newWrapper.find({ testid: 'promptButton' }).text()).toEqual(
            'Add Prompts',
          )
        })
        it('calls prompts api when clicked', () => {
          const newWrapper = shallow(<MainFeedScreen />)
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
          const newWrapper = shallow(<MainFeedScreen />)
          expect(newWrapper.find({ testid: 'promptButton' })).toHaveLength(0)
        })
      })
    })
    describe('header', () => {
      it('renders with the correct text', () => {
        expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual(
          'Daily Art Prompt',
        )
      })
      it('is red', () => {
        expect(
          wrapper.find({ 'data-testid': 'header' }).prop('style'),
        ).toEqual({ color: 'red' })
      })
    })

    describe('<PromptLayout>', () => {
      it('should exist', () => {
        expect(wrapper.find({ 'data-testid': 'promptLayout' })).toHaveLength(1)
      })
    })

    describe('<div> header for Art Gallery', () => {
      it('should render header text', () => {
        const result = wrapper
          .find({ 'data-testid': 'artGalleryHeader' })
          .text()
        expect(result).toEqual('Art Gallery')
      })
    })
  })
})
