import { shallow } from 'enzyme'
import React from 'react'
import DapLogo from '../../main/User/DapLogo'
import logo from '../../main/images/dapLogo.png'

describe('DapLogo', () => {
  it('set img src with correct image', () => {
    const wrapper = shallow(<DapLogo />)
    expect(wrapper.find('img').prop('src')).toEqual(logo)
  })
})
