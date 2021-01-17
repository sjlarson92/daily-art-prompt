import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import { getImagesAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../storage/actions'
import ImageGallery from '../Image/ImageGallery'
import ImageUpload from '../Image/ImageUpload'

const MainFeedScreen = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

  useEffect(() => {
    dispatch(getImagesAction(user.id))
    dispatch(getPromptsAction())
    dispatch({ type: TYPES.SET_INITIAL_DATE })
  }, [dispatch, user.id])

  return (
    <div data-testid="appContainer" className="app">
      <div data-testid="user">{user?.email}</div>
      <button
        data-testid="logoutButton"
        onClick={() => dispatch({ type: TYPES.LOGOUT })}
      >
        Logout
      </button>
      {user.role === 'GODLIKE' && (
        <button
          testid="promptButton"
          onClick={() =>
            axios.post(`${GATEWAY_URL}/api/prompts?userId=${user.id}`)
          }
        >
          Add Prompts
        </button>
      )}
      <div className="header">
        <div className="title">
          <h1 data-testid="header" style={{ color: 'red' }}>
            Daily Art Prompt
          </h1>
        </div>
      </div>
      <PromptLayout data-testid="promptLayout" />
      <hr />
      <h1 data-testid="artGalleryHeader" className="title">
        Art Gallery
      </h1>
      <ImageUpload />
      <ImageGallery />
    </div>
  )
}

export default MainFeedScreen
