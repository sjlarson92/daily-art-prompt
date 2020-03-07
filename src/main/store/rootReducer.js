import thunkMiddleware from 'redux-thunk'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { imagesReducer } from '../Image/imagesReducer'
import { promptsReducer } from '../Prompt/promptsReducer'
import { dateReducer } from '../Prompt/dateReducer'
import { loginReducer } from '../Login/loginReducer'

export const rootReducer = combineReducers({
  images: imagesReducer,
  date: dateReducer,
  prompts: promptsReducer,
  loggedIn: loginReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)
