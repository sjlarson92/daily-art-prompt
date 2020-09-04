import React from 'react'
import { shallow } from 'enzyme'
import { useDispatch } from 'react-redux'
import Image from '../../main/Image/Image'
import * as TYPES from '../../main/storage/actions'

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}))

const defaultProps = {
  image: {
    id: 1,
    url: 'url',
    description: 'i am an image',
  },
}
describe('Image', () => {
  describe('img', () => {
    it('renders with correct src prop', () => {
      const wrapper = shallow(<Image {...defaultProps} />)
      expect(wrapper.find('img').prop('src')).toEqual(defaultProps.image.url)
    })

    it('render with correct alt prop', () => {
      const wrapper = shallow(<Image {...defaultProps} />)
      expect(wrapper.find('img').prop('alt')).toEqual(
        defaultProps.image.description,
      )
    })

    it('dispatches the correct type/payload when image is doubleClicked', () => {
      const dispatch = jest.fn()
      useDispatch.mockReturnValue(dispatch)

      const wrapper = shallow(<Image {...defaultProps} />)
      wrapper.find('img').simulate('doubleClick')

      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.UPDATE_IMAGE_LIKED,
        payload: {
          imageId: defaultProps.image.id,
        },
      })
    })
  })
})
