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
jest.mock('../../main/Prompt/PromptLayout')
jest.mock('../../main/Image/ImageLayout')
jest.mock('axios')

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

const user = {
  id: 'some id',
  email: 'SomeUser',
}
const dispatch = jest.fn()
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

describe('<MainFeedScreen>', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector
      .mockReturnValueOnce(images)
      .mockReturnValueOnce(user)
      .mockReturnValueOnce(images)
      .mockReturnValueOnce(user)
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<MainFeedScreen />)
  })
  describe('On Initial Render', () => {
    it('getImagesAction gets called with the correct param', () => {
      useSelector.mockReturnValueOnce(images).mockReturnValueOnce(user)
      mount(<MainFeedScreen />)
      expect(getImagesAction).toHaveBeenCalledWith(user.id)
    })
    it('dispatches getImagesAction', () => {
      useSelector.mockReturnValueOnce(images).mockReturnValueOnce(user)
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getImagesAction())
    })
    it('dispatches getPromptsAction', () => {
      useSelector.mockReturnValueOnce(images).mockReturnValueOnce(user)
      mount(<MainFeedScreen />)
      expect(dispatch).toHaveBeenCalledWith(getPromptsAction())
    })
    it('dispatches SET_INITIAL_DATE', () => {
      useSelector.mockReturnValueOnce(images).mockReturnValueOnce(user)
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

    describe('<div> for uploadImageDiv', () => {
      describe('<input> Upload Image', () => {
        let inputTag
        let imageDescription
        const image = 'some image...'
        const description = 'blah blah image desc'
        const fileInputEvent = {
          target: {
            files: [image],
          },
        }
        const imageDescEvent = {
          target: {
            value: description,
          },
        }

        beforeEach(() => {
          inputTag = wrapper.find('input')
          imageDescription = wrapper
            .find('textarea')
            .find({ id: 'imageDescription' })
        })
        it('has type file', () => {
          expect(inputTag.prop('type')).toEqual('file')
        })

        describe('<div> Image description', () => {
          it('should have textarea with correct placeholder', () => {
            expect(imageDescription.prop('placeholder')).toEqual(
              'Add image description here...',
            )
          })
        })
        describe('when fileInput changed', () => {
          describe('when imageDescription is entered', () => {
            describe('when upload button is clicked', () => {
              it('makes axios call', () => {
                const data = {
                  image,
                  description,
                }
                inputTag.simulate('change', fileInputEvent)
                imageDescription.simulate('change', imageDescEvent)
                const uploadButton = wrapper
                  .find('button')
                  .find({ 'data-testid': 'uploadButton' })
                uploadButton.simulate('click')
                expect(axios.post).toHaveBeenCalledWith(
                  `${GATEWAY_URL}/api/users/${user.id}/images`,
                  data,
                )
              })
            })
          })
          describe('when imageDescription is not entered', () => {
            describe('when upload button is clicked', () => {
              it('should not make axios call', () => {
                inputTag.simulate('change', fileInputEvent)
                const uploadButton = wrapper
                  .find('button')
                  .find({ 'data-testid': 'uploadButton' })
                uploadButton.simulate('click')
                expect(axios.post).not.toHaveBeenCalled()
              })
            })
          })
          describe('when upload button is not clicked', () => {
            it('does not send the image over HTTP', () => {
              inputTag.simulate('change', fileInputEvent)
              expect(axios.post).not.toHaveBeenCalled()
            })
          })
        })
        describe('when fileInput not changed', () => {
          describe('when imageDescription is not null', () => {
            describe('when upload button is clicked', () => {
              it('does not send the image over HTTP', () => {
                const uploadButton = wrapper
                  .find('button')
                  .find({ 'data-testid': 'uploadButton' })
                imageDescription.simulate('change', imageDescEvent)
                uploadButton.simulate('click')
                expect(axios.post).not.toHaveBeenCalled()
              })
            })
          })
        })
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
          jest.resetAllMocks()
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
