import { shallow } from 'enzyme'
import React from 'react'
import DapInput from '../../main/User/DapInput'

describe('DapInput', () => {
  const icon = 'i am an icon'
  const fieldType = 'some fieldType'
  const fieldName = 'field is a weird word, fiiiieeelldd?'
  const onChange = jest.fn()
  const wrapper = shallow(
    <DapInput
      icon={icon}
      fieldType={fieldType}
      fieldName={fieldName}
      onChange={onChange}
    />,
  )
  it('maps icon properly', () => {
    expect(wrapper.find('FontAwesomeIcon').prop('icon')).toEqual(icon)
  })
  it('maps fieldType properly', () => {
    expect(wrapper.find('input').prop('type')).toEqual(fieldType)
  })
  it('maps fieldName properly', () => {
    expect(wrapper.find('input').prop('name')).toEqual(fieldName)
  })
  it('sets placeholder properly', () => {
    expect(wrapper.find('input').prop('placeholder')).toEqual(fieldName)
  })
  describe('when input is changed', () => {
    it('calls onChange with correct params', () => {
      wrapper
        .find('input')
        .simulate('change', { target: { value: 'i want a nap' } })
      expect(onChange).toHaveBeenCalledWith('i want a nap')
    })
  })
})
