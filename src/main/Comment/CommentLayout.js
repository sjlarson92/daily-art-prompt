import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'

import Comment from './Comment'

const CommentLayout = ({ comment, onDelete, onCancel, onEdit, onSubmit }) => (
  <div>
    {!comment.editing ? (
      <div className="comment-layout-container" data-testid="nonEditingDiv">
        <Comment comment={comment.text} />
        <div id="comment-icon-container">
          <FontAwesomeIcon
            id="delete-icon"
            icon={faTimes}
            name="deleteButton"
            onClick={onDelete}
          />
          <FontAwesomeIcon
            id="edit-icon"
            name="editButton"
            onClick={onEdit}
            icon={faPencilAlt}
          />
        </div>
      </div>
    ) : (
      <div className="comment-layout-container" data-testid="editingDiv">
        <input
          className="comment-input-box"
          name="editInputBox"
          defaultValue={comment.text}
          onKeyDown={onSubmit}
        />
        <button
          id="cancel-button"
          className="btn"
          type="button"
          name="cancelButton"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    )}
  </div>
)

export default CommentLayout
