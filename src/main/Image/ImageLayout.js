import React, { useState } from 'react'
import { connect } from 'react-redux'
import Image from './Image'
import CommentLayout from '../Comment/CommentLayout'
import * as TYPES from '../storage/actions'

export const ImageLayout = ({
  image,
  deleteComment,
  updateCommentEditing,
  editComment,
  addComment,
}) => {
  const [inputBoxText, setInputBoxText] = useState('')

  const onChange = e => {
    setInputBoxText(e.target.value)
  }
  const onKeyDown = (e, imageId) => {
    if (e.keyCode === 13) {
      const { value } = e.target
      addComment(value, imageId)
      setInputBoxText('')
    }
  }

  const handleSubmit = (e, imageId, commentId) => {
    if (e.keyCode === 13) {
      const { value } = e.target
      editComment(imageId, commentId, value)
    }
  }
  return (
    <div id="image-layout-container">
      <Image data-testid="image" image={image} />
      {image.liked && (
        <div data-testid="likedDiv" className="likedText">
          Liked
        </div>
      )}
      <div id="comment-container">
        <div>
          {image.comments &&
            image.comments.map(
              comment =>
                !comment.deleted && (
                  <CommentLayout
                    data-testid={`comment-${comment.id}`}
                    key={`comment-${comment.id}-${image.id}`}
                    comment={comment}
                    onDelete={() => deleteComment(image.id, comment.id)}
                    onEdit={() =>
                      updateCommentEditing(
                        image.id,
                        comment.id,
                        comment.editing,
                      )
                    }
                    onCancel={() =>
                      updateCommentEditing(
                        image.id,
                        comment.id,
                        comment.editing,
                      )
                    }
                    onSubmit={e => handleSubmit(e, image.id, comment.id)}
                  />
                ),
            )}
        </div>
        <input
          className="comment-input-box"
          data-testid="inputBox"
          type="text"
          name="commentBox"
          value={inputBoxText}
          onChange={e => onChange(e)}
          onKeyDown={e => onKeyDown(e, image.id)}
          placeholder="Add Comment..."
        />
      </div>
    </div>
  )
}

export const mapDispatchToProps = dispatch => ({
  deleteComment: (imageId, commentId) =>
    dispatch({
      type: TYPES.DELETE_COMMENT,
      payload: {
        imageId,
        commentId,
      },
    }),
  updateCommentEditing: (imageId, commentId, editing) =>
    dispatch({
      type: TYPES.UPDATE_COMMENT_EDITING,
      payload: {
        imageId,
        commentId,
        editing,
      },
    }),
  editComment: (imageId, commentId, value) =>
    dispatch({
      type: TYPES.EDIT_COMMENT,
      payload: {
        imageId,
        commentId,
        value,
      },
    }),
  addComment: (value, imageId) =>
    dispatch({
      type: TYPES.ADD_COMMENT,
      payload: {
        imageId,
        value,
      },
    }),
})

export default connect(null, mapDispatchToProps)(ImageLayout)
