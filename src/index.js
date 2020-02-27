import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import EntryScreen from './EntryScreen'
import { store } from './store/rootReducer'

ReactDOM.render(
  <Provider store={store}>
    <EntryScreen />
  </Provider>,
  // eslint-disable-next-line no-undef
  document.getElementById('root'),
)
