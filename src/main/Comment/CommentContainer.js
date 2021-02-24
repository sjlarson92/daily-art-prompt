import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { EditComment, Comment } from './CommentLayout'
import { GATEWAY_URL } from '../constants'

const CommentContainer = ({ imageId }) => {
  const userId = useSelector(state => state.user.id)
  const [comments, setComments] = useState([])
  const [inputBoxText, setInputBoxText] = useState('')
  const [editCommentId, setEditCommentId] = useState(null)

  useEffect(() => {
    axios.get(`${GATEWAY_URL}/api/comments?imageId=${imageId}`).then(r => {
      setComments(r.data)
    })
  }, [imageId])

  const deleteComment = async commentId => {
    await axios.delete(`${GATEWAY_URL}/api/comments/${commentId}`)
    setComments(prevComments =>
      prevComments.filter(comment => comment.id !== commentId),
    )
  }

  const addComment = e => {
    if (e.keyCode === 13) {
      const requestBody = {
        imageId,
        userId,
        text: inputBoxText,
      }
      axios.post(`${GATEWAY_URL}/api/comments`, requestBody).then(r => {
        setComments(prevComments => [...prevComments, r.data])
      })
      setInputBoxText('')
    }
  }

  const updateComment = (e, comment) => {
    // TODO: remove dispatch methods from imagesReducer
    if (e.keyCode === 13) {
      const newComment = { ...comment, text: e.target.value }
      axios
        .put(`${GATEWAY_URL}/api/comments/${comment.id}`, newComment)
        .then(r => {
          setEditCommentId(null)
          setComments(prevComments =>
            prevComments.map(prevComment =>
              prevComment.id !== comment.id ? prevComment : r.data,
            ),
          )
        })
    }
  }
  return (
    <div id="comment-container">
      <div>
        {comments.length > 0 &&
          comments.map(comment =>
            comment.id === editCommentId ? (
              <EditComment
                key={`comment-${comment.id}`}
                comment={comment}
                onUpdate={updateComment}
                onCancel={() => setEditCommentId(null)}
              />
            ) : (
              <Comment
                key={`comment-${comment.id}`}
                comment={comment}
                onDelete={deleteComment}
                onEdit={() => setEditCommentId(comment.id)}
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
        onKeyDown={e => addComment(e)}
        placeholder="Add Comment..."
      />
    </div>
  )
}

export default CommentContainer
