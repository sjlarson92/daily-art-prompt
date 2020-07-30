import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './main.css'
import PromptLayout from '../Prompt/PromptLayout'
import ImageLayout from '../Image/ImageLayout'
import { getImagesAction } from '../Image/imageApi'
import { getPromptsAction } from '../Prompt/promptsApi'
import * as TYPES from '../storage/actions'

const MainFeedScreen = () => {
  const images = useSelector(state => state.images)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

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
      <div className="row">
        {images?.length > 0 &&
          images.map(image => (
            <ImageLayout
              data-className="imageLayout"
              data-testid={`image-${image.id}`}
              key={image.id}
              image={image}
            />
          ))}
      </div>
    </div>
  )
}

export default MainFeedScreen
