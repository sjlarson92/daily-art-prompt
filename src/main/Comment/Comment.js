import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const Comment = ({ comment, onDelete, onEdit }) => (
  <div className="comment-layout-container" data-testid="nonEditingDiv">
    <div data-testid="commentDiv">{comment.text}</div>
    <div id="comment-icon-container">
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
  </div>
)

export default Comment
