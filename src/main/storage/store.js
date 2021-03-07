import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { dateReducer } from '../Prompt/dateReducer'
import { loadState, saveState } from './localStorage'
import { userReducer } from '../User/userReducer'
import { promptReducer } from '../Prompt/promptReducer'
import * as TYPES from './actions'
import { imagesReducer } from '../Image/imagesReducer'

const appReducer = combineReducers({
  images: imagesReducer,
  date: dateReducer,
  user: userReducer,
  prompt: promptReducer,
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
