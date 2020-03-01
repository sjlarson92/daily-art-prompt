import React from 'react'

import Comment from './Comment'

const CommentLayout = ({ comment, onDelete, onCancel, onEdit, onSubmit }) => (
  <div>
    <Comment comment={comment.text} />
    {!comment.editing ? (
      <div data-testid="nonEditingDiv">
        <button name="deleteButton" onClick={onDelete}>
          Delete
        </button>
        <button type="button" name="editButton" onClick={onEdit}>
          Edit
        </button>
      </div>
    ) : (
      <div data-testid="editingDiv">
        <input
          name="editInputBox"
          defaultValue={comment.text}
          onKeyDown={onSubmit}
        />
        <button type="button" name="cancelButton" onClick={onCancel}>
          Cancel
        </button>
      </div>
    )}
  </div>
)

export default CommentLayout
