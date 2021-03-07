import React from 'react'
import { shallow } from 'enzyme'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import PromptLayout from '../../main/Prompt/PromptLayout'

jest.mock('react-redux')
jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
  useParams: jest.fn(),
}))

const date = '2021-01-11'
const prompt = {
  id: 1,
  date,
  text: 'i am a prompt',
}
const dispatch = jest.fn()
const history = {
  push: jest.fn(),
}

describe('<PromptLayout>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useDispatch.mockReturnValueOnce(dispatch)
    useHistory.mockReturnValueOnce(history)
    useParams.mockReturnValueOnce({ date })
    useSelector.mockReturnValueOnce(prompt)
  })
  describe('<Promptlayout />', () => {
    describe('<FontAwesomeIcon> for previousButton', () => {
      it('should call history.push with correct params', () => {
        const newDate = moment(date)
          .subtract(1, 'day')
          .format('YYYY-MM-DD')
        const wrapper = shallow(<PromptLayout />)
        wrapper.find({ testid: 'previousButton' }).simulate('click')
        expect(history.push).toHaveBeenCalledWith(`/prompt-images/${newDate}`)
      })
    })

    describe('<Prompt>', () => {
      describe('when there is a prompt for the date', () => {
        it('should render', () => {
          const wrapper = shallow(<PromptLayout />)
          const result = wrapper.find({ testid: 'prompt' })
          expect(result).toHaveLength(1)
        })
      })
      describe('when there is no prompt for the date', () => {
        it('should not render', () => {
          jest.resetAllMocks()
          useDispatch.mockReturnValueOnce(dispatch)
          useHistory.mockReturnValueOnce(history)
          useParams.mockReturnValueOnce({ date })
          useSelector.mockReturnValueOnce(null)
          const wrapper = shallow(<PromptLayout />)
          const result = wrapper.find({ testid: 'prompt' })
          expect(result).toHaveLength(0)
        })
      })
    })

    describe('<FontAwesomeIcon> for nextButton', () => {
      it('should call history.push with correct params', () => {
        const newDate = moment(date)
          .add(1, 'day')
          .format('YYYY-MM-DD')
        const wrapper = shallow(<PromptLayout />)
        wrapper.find({ testid: 'nextButton' }).simulate('click')
        expect(history.push).toHaveBeenCalledWith(`/prompt-images/${newDate}`)
      })
    })
  })
})
