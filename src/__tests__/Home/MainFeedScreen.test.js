import React from 'react'
import { shallow } from 'enzyme'
import {
  dispatchFunctions,
  MainFeedScreen,
  mapStateToProps,
} from '../../main/Home/MainFeedScreen'
import { getImagesAction } from '../../main/Image/imageApi'
import { getPromptsAction } from '../../main/Prompt/promptsApi'
import * as TYPES from '../../main/storage/actions'

const defaultProps = {
  images: [
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
  ],
  updatePromptImages: jest.fn(),
  addComment: jest.fn(),
}

describe('<MainFeedScreen>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  describe('<div> for app', () => {
    describe('header', () => {
      it('renders with the correct text', () => {
        const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
        expect(wrapper.find({ 'data-testid': 'header' }).text()).toEqual(
          'Daily Art Prompt',
        )
      })

      it('is red', () => {
        const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
        expect(
          wrapper.find({ 'data-testid': 'header' }).prop('style'),
        ).toEqual({ color: 'red' })
      })
    })

    describe('<PromptLayout>', () => {
      it('should exist', () => {
        const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
        expect(wrapper.find({ 'data-testid': 'promptLayout' })).toHaveLength(1)
      })
    })

    describe('<div> header for Art Gallery', () => {
      it('should render header text', () => {
        const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
        const result = wrapper
          .find({ 'data-testid': 'artGalleryHeader' })
          .text()
        expect(result).toEqual('Art Gallery')
      })
    })

    describe('<ImageLayout>', () => {
      it('should renders imageLayout for each image in array', () => {
        const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
        expect(wrapper.find({ 'data-className': 'imageLayout' })).toHaveLength(
          3,
        )
      })

      describe('image prop', () => {
        it('should pass image obj to component', () => {
          const wrapper = shallow(<MainFeedScreen {...defaultProps} />)
          expect(
            wrapper.find({ 'data-testid': 'image-1' }).prop('image'),
          ).toEqual({
            id: 1,
            liked: false,
          })
        })
      })
    })
  })
})

describe('mapStateToProps', () => {
  it('should map promptImages', () => {
    const state = {
      images: 'images',
    }
    const result = mapStateToProps(state)
    expect(result.images).toEqual('images')
  })
})

describe('dispatchFunctions', () => {
  it('should have getImages equal to getImagesAction', () => {
    expect(dispatchFunctions.getImages).toEqual(getImagesAction)
  })
  it('should have getPrompts equal to getPromptsAction', () => {
    expect(dispatchFunctions.getPrompts).toEqual(getPromptsAction)
  })
  it('should dispatch when getDate is called with correct params', () => {
    const dispatch = jest.fn()
    const anonymousFunction2 = dispatchFunctions.getDate()
    anonymousFunction2(dispatch)
    expect(dispatch).toHaveBeenCalledWith({ type: TYPES.SET_INITIAL_DATE })
  })
})
