import React from 'react'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import ImageGallery from '../Image/ImageGallery'
import DapNavBar from './DapNavBar'
import ImageUploadModal from '../Image/ImageUploadModal'

const PromptImagesScreen = () => {
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

export default PromptImagesScreen
