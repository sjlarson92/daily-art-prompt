import React from 'react'
import { connect } from 'react-redux'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import ImageLayout from '../Image/ImageLayout'

export const DailyArtPromptApp = ({ images }) => {
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
        {images.map(image => (
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
  images: state.images,
})

export default connect(mapStateToProps)(DailyArtPromptApp)
