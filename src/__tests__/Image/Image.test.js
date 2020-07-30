import React from 'react'
import { shallow } from 'enzyme'
import { Image, mapDispatchToProps } from '../../main/Image/Image'
import * as TYPES from '../../main/storage/actions'

const defaultProps = {
  image: {
    id: 1,
    src: 'source',
    name: 'name',
  },
  updatePromptImages: jest.fn(),
}
describe('Image', () => {
  describe('img', () => {
    // it('renders with correct src prop', () => {
    //   const wrapper = shallow(<Image {...defaultProps} />)
    //   expect(wrapper.find('img').prop('src')).toEqual(defaultProps.image.src)
    // })

    // it('render with correct alt prop', () => {
    //   const wrapper = shallow(<Image {...defaultProps} />)
    //   expect(wrapper.find('img').prop('alt')).toEqual(defaultProps.image.name)
    // })

    it('should call onDoubleClick from props when image is doubleClicked', () => {
      const wrapper = shallow(<Image {...defaultProps} />)
      wrapper.find({ 'data-testid': 'image' }).simulate('doubleClick')
      expect(defaultProps.updatePromptImages).toHaveBeenCalled()
    })
  })
})

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn()

  describe('updatePromptImages', () => {
    it('should call dispatch with type: UPDATE_PROMPT_IMAGES and correct payload', () => {
      mapDispatchToProps(dispatch).updatePromptImages(1)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.UPDATE_PROMPT_IMAGES,
        payload: {
          imageId: 1,
        },
      })
    })
  })
})
