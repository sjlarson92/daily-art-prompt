import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import Image from './Image'
import CommentLayout from '../Comment/CommentLayout'
import * as TYPES from '../storage/actions'
import { GATEWAY_URL } from '../constants'

const ImageLayout = ({ image }) => {
  const dispatch = useDispatch()
  const [inputBoxText, setInputBoxText] = useState('')
  const userId = useSelector(state => state.user.id)
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.get(`${GATEWAY_URL}/api/comments?imageId=${image.id}`).then(r => {
      setComments(r.data)
    })
  }, [image.id])

  const updateLikeImage = () => {
    dispatch({
      type: TYPES.UPDATE_IMAGE_LIKED,
      payload: {
        imageId: image.id,
      },
    })
  }

  const deleteComment = async commentId => {
    await axios.delete(`${GATEWAY_URL}/api/comments/${commentId}`)
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    )
  }

  const updateCommentEditing = (commentId, editing) => {
    dispatch({
      type: TYPES.UPDATE_COMMENT_EDITING,
      payload: {
        imageId: image.id,
        commentId,
        editing,
      },
    })
  }

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      const requestBody = {
        imageId: image.id,
        userId,
        text: inputBoxText,
      }
      axios.post(`${GATEWAY_URL}/api/comments`, requestBody).then(r => {
        setComments(prevComments => [...prevComments, r.data])
      })
      setInputBoxText('')
    }
  }

  const updateComment = (e, commentId) => {
    if (e.keyCode === 13) {
      dispatch({
        type: TYPES.EDIT_COMMENT,
        payload: {
          imageId: image.id,
          commentId,
          value: e.target.value,
        },
      })
    }
  }
  return (
    <div id="image-layout-container">
      <Image data-testid="image" image={image} />
      <div id="image-details-container">
        <FontAwesomeIcon
          id={image.liked ? 'liked' : 'unliked'}
          className="pointer-on-hover"
          icon={faHeart}
          onClick={updateLikeImage}
        />
        <div id="comment-container">
          <div>
            {comments.length > 0 &&
              comments?.map(comment => (
                <CommentLayout
                  testid={`comment-${comment.id}`}
                  key={`comment-${comment.id}-${image.id}`}
                  comment={comment}
                  onDelete={() => deleteComment(comment.id)}
                  onEdit={() =>
                    updateCommentEditing(comment.id, comment.editing)
                  }
                  onCancel={() =>
                    updateCommentEditing(comment.id, comment.editing)
                  }
                  onSubmit={e => updateComment(e, comment.id)}
                />
              ))}
          </div>
          <input
            className="comment-input-box"
            testid="commentInputBox"
            type="text"
            name="commentBox"
            value={inputBoxText}
            onChange={e => setInputBoxText(e.target.value)}
            onKeyDown={e => onKeyDown(e)}
            placeholder="Add Comment..."
          />
        </div>
      </div>
    </div>
  )
}

export default ImageLayout
