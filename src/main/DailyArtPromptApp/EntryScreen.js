import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import DailyArtPromptApp from './DailyArtPromptApp'
import { getImagesAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../store/actions'

export const EntryScreen = ({ getImages, getPrompts, getDate }) => {
  useEffect(() => {
    getImages()
    getPrompts()
    getDate()
  }, [getImages, getPrompts, getDate])

  const history = useHistory()
  const loggedIn = useSelector(state => state.loggedIn)
  if (!loggedIn) {
    history.push('/login')
  }
  return <DailyArtPromptApp data-testid="dailyArtPromptApp" />
}

export const dispatchFunctions = {
  getImages: getImagesAction,
  getPrompts: getPromptsAction,
  getDate: () => dispatch => {
    dispatch({
      type: TYPES.SET_INITIAL_DATE,
    })
  },
}

export default connect(null, dispatchFunctions)(EntryScreen)
