import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'
import { uploadImageAction } from './imageApi'

const ImageUpload = () => {
  const [insertedImage, setInsertedImage] = useState(null)
  const [imageDescription, setImageDescription] = useState('')
  const [alert, setAlert] = useState({ message: '', variant: '' })
  const [showAlert, setShowAlert] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const fileInputRef = useRef(null)
  const currentPromptId = useSelector(state => state.prompt.id)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (insertedImage != null && imageDescription !== '') {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [insertedImage, imageDescription])

  const handleClick = async () => {
    const newAlert = await uploadImageAction(
      user.id,
      currentPromptId,
      imageDescription,
      insertedImage,
      dispatch,
    )
    setInsertedImage(null)
    setImageDescription('')
    setShowAlert(true)
    setAlert(newAlert)
    if (fileInputRef.current !== null) {
      fileInputRef.current.value = ''
    }
  }
  return (
    <div data-testid="uploadImageDiv">
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
      <textarea
        testid="imageDescriptionTextArea"
        id="imageDescription"
        placeholder="Write a caption..."
        value={imageDescription}
        onChange={e => setImageDescription(e.target.value)}
      />
      <div id="image-upload-div">
        <input
          data-testid="fileInput"
          type="file"
          ref={fileInputRef}
          onChange={e => setInsertedImage(e.target.files[0])}
        />
        <button
          disabled={isDisabled}
          data-testid="uploadButton"
          onClick={handleClick}
        >
          Upload
        </button>
      </div>
      <div />
    </div>
  )
}

export default ImageUpload
