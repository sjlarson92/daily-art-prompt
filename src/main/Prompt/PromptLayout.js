import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
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
  const iconSize = '3x'

  useEffect(() => {
    dispatch({
      type: TYPES.SET_CURRENT_PROMPT_ID,
      payload: {
        promptId: Object.keys(prompts).length > 0 && prompts[date]?.id,
      },
    })
  }, [prompts, date, dispatch])

  return (
    <div data-testid="mainContentContainer" className="prompt-row">
      <FontAwesomeIcon
        data-testid="previousButton"
        className="prompt-button"
        icon={faChevronCircleLeft}
        size={iconSize}
        onClick={() => dispatch(updatePreviousDateAction())}
      />

      {Object.keys(prompts).length > 0 && prompts[date] && (
        <Prompt data-testid="prompt" prompt={prompts[date]} />
      )}

      <FontAwesomeIcon
        data-testid="nextButton"
        className="prompt-button"
        icon={faChevronCircleRight}
        size={iconSize}
        onClick={() => dispatch(updateNextDateAction())}
      />
    </div>
  )
}

export default PromptLayout
