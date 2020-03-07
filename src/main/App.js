import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/rootReducer'
import LoginScreen from './Login/LoginScreen'
import EntryScreen from './DailyArtPromptApp/EntryScreen'
import ErrorScreen from './Login/ErrorScreen'

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={EntryScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route component={ErrorScreen} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
