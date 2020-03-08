import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import MainFeedScreen from './MainFeedScreen'

const HomeScreen = () => {
  const history = useHistory()
  const loggedIn = useSelector(state => state.loggedIn)
  if (!loggedIn) {
    history.push('/login')
  }
  return <MainFeedScreen data-testid="dailyArtPromptApp" />
}

export default HomeScreen
