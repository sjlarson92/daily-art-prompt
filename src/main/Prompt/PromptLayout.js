import { connect } from 'react-redux'
import React from 'react'
import PromptButton from './PromptButton'
import Prompt from './Prompt'
import {
  updateNextDateAction,
  updatePreviousDateAction,
} from './dispatchFunctions'

export const PromptLayout = ({
  prompts,
  date,
  updateNextDate,
  updatePreviousDate,
}) => (
  <div data-testid="mainContentContainer" className="prompt-row">
    <PromptButton
      data-testid="previousButton"
      onClick={() => updatePreviousDate()}
      text="Previous"
    />
    {Object.keys(prompts).length > 0 && prompts[date] && (
      <Prompt data-testid="prompt" prompt={prompts[date]} />
    )}

    <PromptButton
      data-testid="nextButton"
      onClick={() => updateNextDate()}
      text="Next"
    />
  </div>
)

export const mapStateToProps = state => ({
  date: state.date,
  prompts: state.prompts,
})

export const dispatchFunctions = {
  updateNextDate: updateNextDateAction,
  updatePreviousDate: updatePreviousDateAction,
}

export default connect(mapStateToProps, dispatchFunctions)(PromptLayout)
