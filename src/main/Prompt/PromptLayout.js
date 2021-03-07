import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronCircleRight,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'
import Prompt from './Prompt'
import { getPromptByDate } from './promptsApi'

const iconSize = '3x'

const PromptLayout = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { date } = useParams()
  const prompt = useSelector(state => state.prompt)

  useEffect(() => {
    getPromptByDate(dispatch, date)
  }, [date, dispatch])

  const changeDate = amount => {
    const newDate = moment(date)
      .add(amount, 'day')
      .format('YYYY-MM-DD')
    history.push(`/prompt-images/${newDate}`)
  }

  return (
    <div data-testid="mainContentContainer" className="prompt-row">
      <FontAwesomeIcon
        testid="previousButton"
        className="prompt-button"
        icon={faChevronCircleLeft}
        size={iconSize}
        onClick={() => changeDate(-1)}
      />
      {prompt && <Prompt testid="prompt" prompt={prompt} />}
      <FontAwesomeIcon
        testid="nextButton"
        className="prompt-button"
        icon={faChevronCircleRight}
        size={iconSize}
        onClick={() => changeDate(1)}
      />
    </div>
  )
}

export default PromptLayout
