import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import PromptButton from './PromptButton'
import Prompt from './Prompt'
import {
  updateNextDateAction,
  updatePreviousDateAction,
} from './dispatchFunctions'
import * as TYPES from '../storage/actions'

const PromptLayout = () => {
  const prompts = useSelector(state => state.prompts)
  const date = useSelector(state => state.date)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({
      type: TYPES.SET_CURRENT_PROMPT_ID,
      payload: {
        promptId: Object.keys(prompts).length > 0 && prompts[date]?.id,
      },
    })
  }, [prompts, date])

  return (
    <div data-testid="mainContentContainer" className="prompt-row">
      <PromptButton
        data-testid="previousButton"
        onClick={() => dispatch(updatePreviousDateAction())}
        text="Previous"
      />
      {Object.keys(prompts).length > 0 && prompts[date] && (
        <Prompt data-testid="prompt" prompt={prompts[date]} />
      )}

      <PromptButton
        data-testid="nextButton"
        onClick={() => dispatch(updateNextDateAction())}
        text="Next"
      />
    </div>
  )
}

export default PromptLayout
