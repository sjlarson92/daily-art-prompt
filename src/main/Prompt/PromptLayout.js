import { useDispatch } from 'react-redux'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import Prompt from './Prompt'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

const iconSize = '3x'

const PromptLayout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { date } = useParams()
  const [prompt, setPrompt] = useState(null)

  useEffect(() => {
    // TODO: create new api for ${GATEWAY_URL}/api/prompts?date=
    // TODO: add to promptsApi
    axios.get(`${GATEWAY_URL}/api/prompts`).then(r => {
      const newPrompt = r.data[date]
      setPrompt(newPrompt)
      // TODO: save prompt in redux and pull in Prompt component
      dispatch({
        type: TYPES.SET_CURRENT_PROMPT_ID,
        payload: {
          promptId: newPrompt.id,
        },
      })
    })
  }, [date, dispatch])

  const changeDate = amount => {
    const newDate = moment(date)
      .add(amount, 'day')
      .format('YYYY-MM-DD')
    console.log('addDate, newDate: ', newDate)
    history.push(`/prompt-images/${newDate}`)
  }

  return (
    <div data-testid="mainContentContainer" className="prompt-row">
      <FontAwesomeIcon
        data-testid="previousButton"
        className="prompt-button"
        icon={faChevronCircleLeft}
        size={iconSize}
        onClick={() => changeDate(-1)}
      />
      {prompt && <Prompt data-testid="prompt" prompt={prompt} />}
      <FontAwesomeIcon
        data-testid="nextButton"
        className="prompt-button"
        icon={faChevronCircleRight}
        size={iconSize}
        onClick={() => changeDate(1)}
      />
    </div>
  )
}

export default PromptLayout
