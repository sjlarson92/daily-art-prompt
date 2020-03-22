import React from 'react'
import { shallow, mount } from 'enzyme'
import { useSelector, useDispatch } from 'react-redux'
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
jest.mock('../../main/Prompt/PromptLayout')
jest.mock('../../main/Image/ImageLayout')

const images = [
  {
    id: 1,
    liked: false,
  },
  {
    id: 2,
    liked: true,
  },
  {
    id: 3,
    liked: false,
  },
]
const dispatch = jest.fn()

describe('<MainFeedScreen>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockReturnValue(images)
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<MainFeedScreen />)
  })
  describe('On Initial Render', () => {
    it('dispatches SET_INITIAL_DATE', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith({ type: TYPES.SET_INITIAL_DATE })
    })
    it('dispatches getImagesAction', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getImagesAction())
    })
    it('dispatches getPromptsAction', () => {
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getPromptsAction())
    })
  })

  describe('<div> for app', () => {
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
    describe('<ImageLayout>', () => {
      describe('when there are images', () => {
        it('renders imageLayout for each image in array', () => {
          expect(
            wrapper.find({ 'data-className': 'imageLayout' }),
          ).toHaveLength(3)
        })
        describe('image prop', () => {
          it('should pass image obj to component', () => {
            expect(
              wrapper.find({ 'data-testid': 'image-1' }).prop('image'),
            ).toEqual({
              id: 1,
              liked: false,
            })
          })
        })
      })
      describe('when there are NO images', () => {
        it('should not render ImageLayout', () => {
          useSelector.mockReturnValue([])
          wrapper = shallow(<MainFeedScreen />)
          expect(
            wrapper.find({ 'data-className': 'imageLayout' }),
          ).toHaveLength(0)
        })
      })
    })
  })
})