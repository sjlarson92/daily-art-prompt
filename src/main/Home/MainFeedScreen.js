import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import { getImagesAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../storage/actions'
import ImageGallery from '../Image/ImageGallery'
import ImageUpload from '../Image/ImageUpload'
import DapNavBar from './DapNavBar'

const MainFeedScreen = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImagesAction(user.id))
    dispatch(getPromptsAction())
    dispatch({ type: TYPES.SET_INITIAL_DATE })
  }, [dispatch, user.id])

  return (
    <div data-testid="appContainer">
      <DapNavBar />
      <div className="app">
        <div id="prompt-layout-container">
          <PromptLayout data-testid="promptLayout" />
        </div>
        <hr />
        <h1 data-testid="artGalleryHeader" className="title">
          Art Gallery
        </h1>
        <ImageUpload />
        <ImageGallery />
      </div>
    </div>
  )
}

export default MainFeedScreen
