import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import ImageLayout from '../Image/ImageLayout'
import { getImagesAction, uploadImageAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../storage/actions'

const MainFeedScreen = () => {
  const images = useSelector(state => state.images)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [alert, setAlert] = useState({ message: '', variant: '' })
  const [showAlert, setShowAlert] = useState(false)
  const [insertedImage, setInsertedImage] = useState(null)
  const [imageDescription, setImageDescription] = useState(null)
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

  useEffect(() => {
    dispatch(getImagesAction(user.id))
    dispatch(getPromptsAction())
    dispatch({ type: TYPES.SET_INITIAL_DATE })
  }, [dispatch, user.id])

  const handleClick = async () => {
    if (insertedImage != null && imageDescription != null) {
      const newAlert = await uploadImageAction(
        user.id,
        imageDescription,
        insertedImage,
        dispatch,
      )
      setShowAlert(true)
      setAlert(newAlert)
    }
  }
  return (
    <div data-testid="appContainer" className="app">
      {showAlert && (
        <Alert
          testid="alert"
          variant={alert.variant}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <div data-testid="user">{user?.email}</div>
      <button
        data-testid="logoutButton"
        onClick={() => dispatch({ type: TYPES.LOGOUT })}
      >
        Logout
      </button>
      {user.role === 'GODLIKE' && (
        <button
          testid="promptButton"
          onClick={() => axios.post(`${GATEWAY_URL}/api/prompts`)}
        >
          Add Prompts
        </button>
      )}
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
      <div data-testid="uploadImageDiv">
        <h1>Upload Image</h1>
        <input
          data-testid="fileInput"
          type="file"
          onChange={e => setInsertedImage(e.target.files[0])}
        />
        <textarea
          testid="imageDescriptionTextArea"
          id="imageDescription"
          placeholder="Add image description here..."
          onChange={e => setImageDescription(e.target.value)}
        />
        <button data-testid="uploadButton" onClick={handleClick}>
          Upload
        </button>
        <div />
      </div>
      <div className="row">
        {images?.length > 0 &&
          images.map(image => (
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

export default MainFeedScreen
