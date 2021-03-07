import React from 'react'
import './main.css'
import { useHistory, useParams } from 'react-router-dom'
import PromptLayout from '../Prompt/PromptLayout'
import ImageGallery from '../Image/ImageGallery'
import DapNavBar from './DapNavBar'
import ImageUploadModal from '../Image/ImageUploadModal'

const PromptImagesScreen = () => {
  const history = useHistory()
  const { date } = useParams()
  return (
    <div data-testid="appContainer">
      <DapNavBar />
      <div className="app">
        <div id="prompt-layout-container">
          <PromptLayout testid="promptLayout" />
        </div>
        <hr />
        <div id="image-tab-container">
          <ImageUploadModal testid="imageUploadModal" />
          <div
            onClick={() => {
              history.push(`/prompt-images/${date}`)
            }}
          >
            My Gallery
          </div>
          <div
            role="link"
            onClick={() => {
              history.push(`/prompt-images/${date}/community-gallery`)
            }}
          >
            Community Gallery
          </div>
        </div>
        <ImageGallery testid="imageGallery" />
      </div>
    </div>
  )
}

export default PromptImagesScreen
