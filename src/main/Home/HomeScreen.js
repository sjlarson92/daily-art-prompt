import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import MainFeedScreen from './MainFeedScreen'

const HomeScreen = () => {
  const history = useHistory()
  const user = useSelector(state => state.user) // pulls variable from redux
  if (!user.isLoggedIn) {
    history.push('/login')
    return null
  }
  return <MainFeedScreen data-testid="mainFeedScreen" />
}

export default HomeScreen
