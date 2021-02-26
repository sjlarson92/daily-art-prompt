import React from 'react'

const EditComment = ({ comment, onUpdate, onCancel }) => (
  <div className="comment-layout-container" data-testid="editingDiv">
    <input
      className="comment-input-box"
      defaultValue={comment.text}
      onKeyDown={e => onUpdate(e, comment)}
    />
    <button id="cancel-button" className="btn" type="button" onClick={onCancel}>
      Cancel
    </button>
  </div>
)

export default EditComment
