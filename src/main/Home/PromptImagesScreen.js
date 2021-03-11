import React from 'react'
import './main.css'
import { useLocation, useParams } from 'react-router-dom'
import PromptLayout from '../Prompt/PromptLayout'
import ImageGallery from '../Image/ImageGallery'
import DapNavBar from './DapNavBar'
import ImageUploadModal from '../Image/ImageUploadModal'

const PromptImagesScreen = () => {
  const { date } = useParams()
  const location = useLocation()

  return (
    <div data-testid="appContainer">
      <DapNavBar />
      <div className="app">
        <div id="prompt-layout-container">
          <PromptLayout testid="promptLayout" />
        </div>
        <hr />
        <div id="image-tab-container">
          <div className="col-4">
            <ImageUploadModal testid="imageUploadModal" />
          </div>
          <div className="col-4 pointer-on-hover">
            <a
              testid="myGallery"
              className={
                location.pathname.endsWith('community-gallery')
                  ? 'tab'
                  : 'selected-tab tab'
              }
              href={`/prompt-images/${date}`}
            >
              My Gallery
            </a>
          </div>
          <div className="col-4 pointer-on-hover">
            <a
              testid="communityGallery"
              className={
                location.pathname.endsWith('community-gallery')
                  ? 'selected-tab tab'
                  : 'tab'
              }
              href={`/prompt-images/${date}/community-gallery`}
            >
              Community Gallery
            </a>
          </div>
        </div>
        <ImageGallery testid="imageGallery" />
      </div>
    </div>
  )
}

export default PromptImagesScreen
