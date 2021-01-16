import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { imagesReducer } from '../Image/imagesReducer'
import { promptsReducer } from '../Prompt/promptsReducer'
import { dateReducer } from '../Prompt/dateReducer'
import { loadState, saveState } from './localStorage'
import { errorMessageReducer } from './errorMessageReducer'
import { userReducer } from '../User/userReducer'
import { currentPromptIdReducer } from '../Prompt/currentPromptIdReducer'

export const rootReducer = combineReducers({
  images: imagesReducer,
  date: dateReducer,
  prompts: promptsReducer,
  errorMessage: errorMessageReducer,
  user: userReducer,
  currentPromptId: currentPromptIdReducer,
})

const persistedState = loadState()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
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
