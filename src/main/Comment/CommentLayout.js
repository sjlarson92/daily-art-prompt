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
            className="pointer-on-hover"
            icon={faTimes}
            testid="deleteButton"
            onClick={onDelete}
          />
          <FontAwesomeIcon
            id="edit-icon"
            testid="editButton"
            onClick={onEdit}
            icon={faPencilAlt}
          />
        </div>
      </div>
    ) : (
      <div className="comment-layout-container" data-testid="editingDiv">
        <input
          className="comment-input-box"
          testid="editInputBox"
          defaultValue={comment.text}
          onKeyDown={onSubmit}
        />
        <button
          id="cancel-button"
          className="btn"
          type="button"
          testid="cancelButton"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    )}
  </div>
)

export default CommentLayout
