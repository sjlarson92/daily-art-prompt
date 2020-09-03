import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import './main.css'
import axios from 'axios'
import PromptLayout from '../Prompt/PromptLayout'
import ImageLayout from '../Image/ImageLayout'
import { getImagesAction } from '../Image/imageApi'
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

  const handleClick = () => {
    // TODO: pull this method out to imagesApi, what about the alert? discuss w/ lucas. Maybe use modal?
    if (insertedImage != null && imageDescription != null) {
      const formData = new FormData()
      formData.append('description', imageDescription)
      formData.append('file', insertedImage)
      axios
        .post(`${GATEWAY_URL}/api/users/${user.id}/images`, formData)
        .then(response => {
          setShowAlert(true)
          if (response.status === 201) {
            setAlert({ message: 'Image has been saved', variant: 'success' })
            dispatch({
              type: TYPES.ADD_IMAGE,
              payload: { image: response.data },
            })
          } else {
            setAlert({
              message: 'Failed to save image. Please try again.',
              variant: 'danger',
            })
          }
        }) // TODO: Add catch
    }
  }
  return (
    <div data-testid="appContainer" className="app">
      {showAlert && (
        <Alert
          testId="alert"
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
