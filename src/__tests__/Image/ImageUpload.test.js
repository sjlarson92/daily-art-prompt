import { when } from 'jest-when'
import { shallow, mount } from 'enzyme'
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImageAction } from '../../main/Image/imageApi'
import ImageUpload from '../../main/Image/ImageUpload'

jest.mock('react-redux')
jest.mock('../../main/Image/imageApi')
jest.mock('axios')

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const prompt = {
  id: 1,
}

const mockState = {
  user,
  prompt,
}
const dispatch = jest.fn()

describe('ImageUpload', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
    wrapper = shallow(<ImageUpload />)
  })
  describe('<div> for uploadImageDiv', () => {
    describe('<input> Upload Image', () => {
      let inputTag
      let imageDescriptionTextArea
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
        imageDescriptionTextArea = wrapper
          .find('textarea')
          .find({ testid: 'imageDescriptionTextArea' })
      })
      it('has type file', () => {
        expect(inputTag.prop('type')).toEqual('file')
      })

      describe('<div> Image description', () => {
        it('should have textarea with correct placeholder', () => {
          expect(imageDescriptionTextArea.prop('placeholder')).toEqual(
            'Write a caption...',
          )
        })
      })

      describe('when fileInput changed', () => {
        describe('when imageDescription is entered', () => {
          it('uploadButton should be enabled', () => {
            jest.clearAllMocks()
            const newWrapper = mount(<ImageUpload />)
            inputTag = newWrapper.find({ 'data-testid': 'fileInput' })
            imageDescriptionTextArea = newWrapper.find({
              testid: 'imageDescriptionTextArea',
            })
            inputTag.simulate('change', fileInputEvent)
            imageDescriptionTextArea.simulate('change', imageDescEvent)
            expect(
              newWrapper
                .find({ 'data-testid': 'uploadButton' })
                .prop('disabled'),
            ).toEqual(false)
          })
          describe('when upload button is clicked', () => {
            it('calls uploadImageAction with correct params', () => {
              jest.clearAllMocks()
              when(uploadImageAction)
                .calledWith(user.id, description, image, dispatch)
                .mockResolvedValue({
                  message: 'Image has been saved',
                  variant: 'success',
                })
              wrapper = shallow(<ImageUpload />)
              inputTag = wrapper.find('input')
              imageDescriptionTextArea = wrapper.find({
                testid: 'imageDescriptionTextArea',
              })
              inputTag.simulate('change', fileInputEvent)
              imageDescriptionTextArea.simulate('change', imageDescEvent)
              const uploadButton = wrapper
                .find('button')
                .find({ 'data-testid': 'uploadButton' })
              uploadButton.simulate('click')
              expect(uploadImageAction).toHaveBeenCalledWith(
                user.id,
                prompt.id,
                description,
                image,
                dispatch,
              )
            })
            describe('when uploadImageAction returns promise', () => {
              it('renders alert with correct props', async () => {
                jest.clearAllMocks()
                when(uploadImageAction)
                  .calledWith(user.id, prompt.id, description, image, dispatch)
                  .mockResolvedValue({
                    message: 'Image has been saved',
                    variant: 'success',
                  })
                wrapper = shallow(<ImageUpload />)
                inputTag = wrapper.find('input')
                imageDescriptionTextArea = wrapper.find({
                  testid: 'imageDescriptionTextArea',
                })
                inputTag.simulate('change', fileInputEvent)
                imageDescriptionTextArea.simulate('change', imageDescEvent)
                const uploadButton = wrapper.find({
                  'data-testid': 'uploadButton',
                })
                await uploadButton.simulate('click')
                setTimeout(() => {
                  expect(wrapper.find({ testid: 'alert' }).text()).toEqual(
                    'Image has been saved',
                  )
                  expect(
                    wrapper.find({ testid: 'alert' }).prop('variant'),
                  ).toEqual('success')
                }, 2000)
              })
            })
          })
        })
        describe('when imageDescription is not entered', () => {
          it('uploadButton should NOT be enabled', () => {
            jest.clearAllMocks()
            const newWrapper = mount(<ImageUpload />)
            inputTag = newWrapper.find({ 'data-testid': 'fileInput' })
            inputTag.simulate('change', fileInputEvent)
            expect(
              newWrapper
                .find({ 'data-testid': 'uploadButton' })
                .prop('disabled'),
            ).toEqual(true)
          })
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
        describe('when imageDescription is not changed', () => {
          wrapper = mount(<ImageUpload />)
          expect(
            wrapper.find({ 'data-testid': 'uploadButton' }).prop('disabled'),
          ).toEqual(true)
        })
        describe('when imageDescription is not null', () => {
          it('uploadButton should NOT be enabled', () => {
            jest.clearAllMocks()
            const newWrapper = mount(<ImageUpload />)
            imageDescriptionTextArea = newWrapper.find({
              testid: 'imageDescriptionTextArea',
            })
            imageDescriptionTextArea.simulate('change', imageDescEvent)
            expect(
              newWrapper
                .find({ 'data-testid': 'uploadButton' })
                .prop('disabled'),
            ).toEqual(true)
          })
          describe('when upload button is clicked', () => {
            it('does not send the image over HTTP', () => {
              const uploadButton = wrapper
                .find('button')
                .find({ 'data-testid': 'uploadButton' })
              imageDescriptionTextArea.simulate('change', imageDescEvent)
              uploadButton.simulate('click')
              expect(axios.post).not.toHaveBeenCalled()
            })
          })
        })
      })
    })
  })
})
