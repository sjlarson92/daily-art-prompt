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
  // const comments = useSelector(state => state.comments)
  const [comments, setComments] = useState([])

  useEffect(() => {
    axios.get(`${GATEWAY_URL}/api/comments?imageId=${image.id}`).then(r => {
      console.log('response: ', r.data)
      setComments(r.data)
      // dispatch({
      //   type: TYPES.SET_COMMENTS,
      //   payload: {
      //     comments: r.data,
      //   },
      // })
    })
  }, [image.id])

  const updateLikeImage = imageId => {
    dispatch({
      type: TYPES.UPDATE_IMAGE_LIKED,
      payload: {
        imageId,
      },
    })
  }

  const deleteComment = (imageId, commentId) => {
    dispatch({
      type: TYPES.DELETE_COMMENT,
      payload: {
        imageId,
        commentId,
      },
    })
  }

  const updateCommentEditing = (imageId, commentId, editing) => {
    dispatch({
      type: TYPES.UPDATE_COMMENT_EDITING,
      payload: {
        imageId,
        commentId,
        editing,
      },
    })
  }

  const onKeyDown = (e, imageId) => {
    if (e.keyCode === 13) {
      const requestBody = {
        imageId,
        userId,
        text: inputBoxText,
      }
      axios.post(`${GATEWAY_URL}/api/comments`, requestBody).then(r => {
        // dispatch({
        //   type: TYPES.ADD_COMMENT,
        //   payload: {
        //     comment: r.data,
        //   },
        // })
        console.log('successfully created comment', r.data)
      })
      setInputBoxText('')
    }
  }

  const updateComment = (e, imageId, commentId) => {
    if (e.keyCode === 13) {
      dispatch({
        type: TYPES.EDIT_COMMENT,
        payload: {
          imageId,
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
          onClick={() => updateLikeImage(image.id)}
        />
        <div id="comment-container">
          <div>
            {comments?.map(
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
                    onSubmit={e => updateComment(e, image.id, comment.id)}
                  />
                ),
            )}
          </div>
          <input
            className="comment-input-box"
            testid="commentInputBox"
            type="text"
            name="commentBox"
            value={inputBoxText}
            onChange={e => setInputBoxText(e.target.value)}
            onKeyDown={e => onKeyDown(e, image.id)}
            placeholder="Add Comment..."
          />
        </div>
      </div>
    </div>
  )
}

export default ImageLayout
