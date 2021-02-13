import { shallow } from 'enzyme'
import React from 'react'
import ImageUploadModal from '../../main/Image/ImageUploadModal'
import addImageIcon from '../../main/images/addImage.png'

describe('ImageUploadModal', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<ImageUploadModal />)
  })
  describe('img', () => {
    it('have correct src', () => {
      expect(wrapper.find({ testid: 'addImageIcon' }).prop('src')).toEqual(
        addImageIcon,
      )
    })
    describe('when clicked', () => {
      it('show modal to upload image', () => {
        wrapper.find({ testid: 'addImageIcon' }).simulate('click')
        expect(wrapper.find({ testid: 'uploadImageModal' })).toHaveLength(1)
      })
    })
  })
})
