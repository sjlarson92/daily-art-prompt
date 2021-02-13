import Modal from 'react-bootstrap/Modal'
import React, { useState } from 'react'
import ImageUpload from './ImageUpload'
import addImageIcon from '../images/addImage.png'

const ImageUploadModal = () => {
  const [showModal, setShowModal] = useState(null)
  return (
    <div>
      <img
        id="add-image-icon"
        testid="addImageIcon"
        src={addImageIcon}
        alt="add pic"
        onClick={() => setShowModal(true)}
        role="presentation"
      />
      <Modal
        testid="uploadImageModal"
        show={showModal}
        onHide={() => setShowModal(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header id="image-modal-header" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Upload Image
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageUpload />
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ImageUploadModal
