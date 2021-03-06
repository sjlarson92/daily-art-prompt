import React from 'react'
import { shallow } from 'enzyme'
import Image from '../../main/Image/Image'

const defaultProps = {
  image: {
    id: 1,
    url: 'url',
    description: 'i am an image',
  },
  onDoubleClick: jest.fn(),
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
      const wrapper = shallow(<Image {...defaultProps} />)
      wrapper.find('img').simulate('doubleClick')
      expect(defaultProps.onDoubleClick).toHaveBeenCalled()
    })
  })
})
