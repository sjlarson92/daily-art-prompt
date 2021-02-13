import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import { getImagesAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../storage/actions'
import ImageGallery from '../Image/ImageGallery'
import DapNavBar from './DapNavBar'
import ImageUploadModal from '../Image/ImageUploadModal'

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
        <div id="image-tab-container">
          <ImageUploadModal />
          <div> My Gallery </div>
          <div> Community Gallery </div>
        </div>
        <ImageGallery />
      </div>
    </div>
  )
}

export default MainFeedScreen
