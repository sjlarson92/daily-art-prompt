import React from 'react'
import { connect } from 'react-redux'
import './DailyArtPromptApp.css'
import ImageLayout from './components/ImageLayout'

import PromptLayout from './components/PromptLayout'

export const DailyArtPromptApp = ({ promptsImages }) => {
  return (
    <div data-testid="appContainer" className="app">
      <div className="header">
        <div className="title">
          <h1 data-testid="header" style={{ color: 'red' }}>
            Daily Art Prompt
          </h1>
        </div>
      </div>
      <PromptLayout data-testid="promptLayout" />
      <hr />
      <h1 data-testid="artGalleryHeader" className="title">
        Art Gallery
      </h1>
      <div className="row">
        {promptsImages.map(image => (
          <ImageLayout
            data-className="imageLayout"
            data-testid={`image-${image.id}`}
            key={image.id}
            image={image}
          />
        ))}
      </div>
    </div>
  )
}

export const mapStateToProps = state => ({
  promptsImages: state.promptsImages,
})

export default connect(mapStateToProps)(DailyArtPromptApp)
