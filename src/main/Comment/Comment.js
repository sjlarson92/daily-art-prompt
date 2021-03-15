import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useSelector } from 'react-redux'

const Comment = ({ comment, onDelete, onEdit }) => {
  const userId = useSelector(state => state.user.id)
  return (
    <div className="comment-layout-container">
      <div>
        <strong>{comment.user.name}</strong> {comment.text}
      </div>
      {comment.user.id === userId && (
        <div testid="iconContainer" id="comment-icon-container">
          <FontAwesomeIcon
            id="delete-icon"
            className="pointer-on-hover"
            icon={faTimes}
            testid="deleteButton"
            onClick={() => onDelete(comment.id)}
          />
          <FontAwesomeIcon
            id="edit-icon"
            testid="editButton"
            onClick={onEdit}
            icon={faPencilAlt}
          />
        </div>
      )}
    </div>
  )
}

export default Comment
