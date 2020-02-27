import React from 'react'
import { shallow } from 'enzyme'
import {
  dispatchFunctions,
  mapStateToProps,
  PromptLayout,
} from './PromptLayout'
import {
  updateNextDateAction,
  updatePreviousDateAction,
} from '../store/dispatchFunctions'
import PromptButton from './PromptButton'

describe('<PromptLayout>', () => {
  const defaultProps = {
    prompts: {
      '2020-01-11': 'na na na na na na na na BATMAN!!!',
    },
    date: '2020-01-11',
    updateNextDate: jest.fn(),
    updatePreviousDate: jest.fn(),
  }
  describe('<div> for mainContentContainer', () => {
    it('should have a prompt-row className', () => {
      const wrapper = shallow(<PromptLayout {...defaultProps} />)
      const result = wrapper
        .find({ 'data-testid': 'mainContentContainer' })
        .prop('className')
      expect(result).toEqual('prompt-row')
    })

    describe('<PromptButton> for previousButton', () => {
      it('renders correct text', () => {
        const wrapper = shallow(<PromptLayout {...defaultProps} />)
        expect(
          wrapper.find({ 'data-testid': 'previousButton' }).prop('text'),
        ).toEqual('Previous')
      })
      it('should call updatePreviousDate when clicked', () => {
        const wrapper = shallow(<PromptLayout {...defaultProps} />)
        wrapper.find({ 'data-testid': 'previousButton' }).simulate('click')
        expect(defaultProps.updatePreviousDate).toHaveBeenCalledWith()
      })
    })

    describe('<Prompt>', () => {
      describe('when there are prompts', () => {
        describe('when the date in state is in prompts', () => {
          it('should render', () => {
            const props = {
              ...defaultProps,
              prompts: {
                '2020-01-11': "I'm up all night to get lucky",
              },
            }
            const wrapper = shallow(<PromptLayout {...props} />)
            const result = wrapper.find({ 'data-testid': 'prompt' })
            expect(result).toHaveLength(1)
          })
          it('should render with correct prompt prop', () => {
            const wrapper = shallow(<PromptLayout {...defaultProps} />)
            const result = wrapper
              .find({ 'data-testid': 'prompt' })
              .prop('prompt')
            expect(result).toEqual(defaultProps.prompts[defaultProps.date])
          })
        })
      })
      describe('when the date in state is NOT in prompts', () => {
        it('should not render', () => {
          const props = {
            ...defaultProps,
            prompts: {
              '2020-02-22': 'Had to have high hopes for a living',
            },
          }
          const wrapper = shallow(<PromptLayout {...props} />)
          const result = wrapper.find({ 'data-testid': 'prompt' })
          expect(result).toHaveLength(0)
        })
      })

      describe('when there are no prompts', () => {
        it('should not render <Prompt>', () => {
          const props = {
            ...defaultProps,
            prompts: {},
          }
          const wrapper = shallow(<PromptLayout {...props} />)
          const result = wrapper.find({ 'data-testid': 'prompt' })
          expect(result).toHaveLength(0)
        })
      })
    })

    describe('<PromptButton> for nextButton', () => {
      it('renders correct text', () => {
        const wrapper = shallow(<PromptLayout {...defaultProps} />)
        expect(
          wrapper.find({ 'data-testid': 'nextButton' }).prop('text'),
        ).toEqual('Next')
      })
      it('should call updateNextDate with correct params when clicked', () => {
        const wrapper = shallow(<PromptLayout {...defaultProps} />)
        wrapper.find({ 'data-testid': 'nextButton' }).simulate('click')
        expect(defaultProps.updateNextDate).toHaveBeenCalledWith()
      })
    })
  })

  describe('lucas', () => {
    it('says lucas', () => {
      expect(
        shallow(<PromptButton {...defaultProps} />)
          .find({
            'data-testid': 'LUCAS',
          })
          .childAt(0)
          .text(),
      ).toEqual('HELLO')
    })
  })
})

describe('mapStateToProps', () => {
  it('should map date to props', () => {
    const date = 'my favorite dates are when I get to stay home and drink wine'
    const result = mapStateToProps({
      date,
    })
    expect(result).toEqual({
      date,
    })
  })
  it('should map prompts to props', () => {
    const text = "did you know elephants can't jump?"
    const result = mapStateToProps({
      prompts: { text },
    })
    expect(result).toEqual({
      prompts: { text },
    })
  })
})

describe('dispatchFunctions', () => {
  it('should have the correct actions', () => {
    expect(dispatchFunctions).toEqual({
      updateNextDate: updateNextDateAction,
      updatePreviousDate: updatePreviousDateAction,
    })
  })
})
