import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { imagesReducer } from '../Image/imagesReducer'
import { promptsReducer } from '../Prompt/promptsReducer'
import { dateReducer } from '../Prompt/dateReducer'
import { loadState, saveState } from './localStorage'
import { userReducer } from '../User/userReducer'
import { currentPromptIdReducer } from '../Prompt/currentPromptIdReducer'
import * as TYPES from './actions'

const initialState = {
  byId: {},
}

const commentsReducer = (state = initialState, action) => {
  return initialState
}

const appReducer = combineReducers({
  images: imagesReducer,
  date: dateReducer,
  prompts: promptsReducer,
  user: userReducer,
  currentPromptId: currentPromptIdReducer,
  comments: commentsReducer,
})

const rootReducer = (state, action) => {
  if (action.type === TYPES.LOGOUT) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistedState = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

store.subscribe(() => {
  saveState({
    user: store.getState().user,
  })
})

export default store
