import React from 'react'
import { shallow } from 'enzyme'
import { when } from 'jest-when'
import { useDispatch, useSelector } from 'react-redux'
import PromptLayout from '../../main/Prompt/PromptLayout'
import {
  updateNextDateAction,
  updatePreviousDateAction,
} from '../../main/Prompt/dispatchFunctions'

jest.mock('react-redux')

jest.mock('../../main/Prompt/dispatchFunctions')

const date = '2021-01-11'
const prompts = {
  [date]: 'na na na na na na na na BATMAN!!!',
}
const dispatch = jest.fn()

describe('<PromptLayout>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockReturnValueOnce(prompts).mockReturnValueOnce(date)
    useDispatch.mockReturnValueOnce(dispatch)
  })
  describe('<div> for mainContentContainer', () => {
    it('should have a prompt-row className', () => {
      const wrapper = shallow(<PromptLayout />)
      const result = wrapper
        .find({ 'data-testid': 'mainContentContainer' })
        .prop('className')
      expect(result).toEqual('prompt-row')
    })

    describe('<PromptButton> for previousButton', () => {
      it('renders correct text', () => {
        const wrapper = shallow(<PromptLayout />)
        expect(
          wrapper.find({ 'data-testid': 'previousButton' }).prop('text'),
        ).toEqual('Previous')
      })
      it('should dispatch with return value of updatePreviousDateAction when clicked', () => {
        const wrapper = shallow(<PromptLayout />)
        when(updatePreviousDateAction)
          .calledWith()
          .mockReturnValue('hi')
        wrapper.find({ 'data-testid': 'previousButton' }).simulate('click')
        expect(dispatch).toHaveBeenCalledWith('hi')
      })
    })

    describe('<Prompt>', () => {
      describe('when there are prompts', () => {
        describe('when the date in state is in prompts', () => {
          it('should render', () => {
            const wrapper = shallow(<PromptLayout />)
            const result = wrapper.find({ 'data-testid': 'prompt' })
            expect(result).toHaveLength(1)
          })
          it('should render with correct prompt prop', () => {
            const wrapper = shallow(<PromptLayout />)
            const result = wrapper
              .find({ 'data-testid': 'prompt' })
              .prop('prompt')
            expect(result).toEqual(prompts[date])
          })
        })
      })
      describe('when the date in state is NOT in prompts', () => {
        it('should not render', () => {
          jest.resetAllMocks()
          useSelector
            .mockReturnValueOnce(prompts)
            .mockReturnValueOnce('non existing date')
          const wrapper = shallow(<PromptLayout />)
          const result = wrapper.find({ 'data-testid': 'prompt' })
          expect(result).toHaveLength(0)
        })
      })

      describe('when there are no prompts', () => {
        it('should not render <Prompt>', () => {
          jest.resetAllMocks()
          useSelector.mockReturnValueOnce({}).mockReturnValueOnce(date)
          const wrapper = shallow(<PromptLayout />)
          const result = wrapper.find({ 'data-testid': 'prompt' })
          expect(result).toHaveLength(0)
        })
      })
    })

    describe('<PromptButton> for nextButton', () => {
      it('renders correct text', () => {
        const wrapper = shallow(<PromptLayout />)
        expect(
          wrapper.find({ 'data-testid': 'nextButton' }).prop('text'),
        ).toEqual('Next')
      })
      it('should dispatch with return value of updateNextDateAction when clicked', () => {
        const wrapper = shallow(<PromptLayout />)
        when(updateNextDateAction)
          .calledWith()
          .mockReturnValue('hi')
        wrapper.find({ 'data-testid': 'nextButton' }).simulate('click')
        expect(dispatch).toHaveBeenCalledWith('hi')
      })
    })
  })
})
