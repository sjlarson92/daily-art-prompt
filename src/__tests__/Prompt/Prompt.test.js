import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import Prompt from '../../main/Prompt/Prompt'

const defaultProps = {
  prompt: {
    date: 'November 2',
    id: 1,
    text: 'Hi',
  },
  onClick: jest.fn(),
  somethingElse: 2,
  antherTHing: 'a',
}

describe('<Prompt>', () => {
  // const wrapper = shallow(<Prompt {...defaultProps}/>)
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<Prompt {...defaultProps} />)
  })

  it('should render correct date from prompt', () => {
    expect(wrapper.find({ 'data-testid': 'promptDate' }).text()).toEqual(
      moment(defaultProps.prompt.date).format('MMMM D, YYYY'),
    )
  })

  // it('should render COOL DATE when prompt does not have a date', () => {
  //   const newProps = {
  //     prompt: {
  //       date: undefined,
  //       id: 2,
  //       text: 'something'
  //     }
  //   }
  //   wrapper = shallow(<Prompt {...newProps}/>)
  //   expect(wrapper.find({testID:'promptDate'}).text()).toEqual('COOL DATE')
  // })
  //
  // // different way to overwrite props
  // it('should render COOL DATE when prompt does not have a date', () => {
  //   wrapper = shallow(<Prompt {...defaultProps} prompt={{...defaultProps.prompt, date: undefined}} />)
  //   expect(wrapper.find({testID:'promptDate'}).text()).toEqual('COOL DATE')
  // })

  it('should render correct text from prompt', () => {
    expect(wrapper.find({ 'data-testid': 'promptText' }).text()).toEqual(
      defaultProps.prompt.text,
    )
  })
})
