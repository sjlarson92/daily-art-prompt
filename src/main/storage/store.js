import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { imagesReducer } from '../Image/imagesReducer'
import { promptsReducer } from '../Prompt/promptsReducer'
import { dateReducer } from '../Prompt/dateReducer'
import { loginReducer } from '../Login/loginReducer'
import { loadState, saveState } from './localStorage'
import { errorMessageReducer } from './errorMessageReducer'

export const rootReducer = combineReducers({
  images: imagesReducer,
  date: dateReducer,
  prompts: promptsReducer,
  loggedIn: loginReducer,
  errorMessage: errorMessageReducer,
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
    loggedIn: store.getState().loggedIn,
  })
})

export default store
