# React

## Setting up react app with Create React App

```shell script
yarn create react-app app-name # Create an js app with Create React App
yarn add enzyme # install dependencies
yarn start # Start app must be in root
yarn # install dependencies from package.json
yarn install # same as yarn
```

## Router

```shell script
yarn add react-router-dom  # add dependency
```

```javascript
// App.js
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
export const App = () => {
  return (
    <Router>
      <Link to="/">Daily Art Prompt</Link>
      <Link to="/login">Login</Link>
      <Switch>
        <PrivateRoute exact path="/">
          <EntryScreen />
        </PrivateRoute>
        <Route path="/login">
          <LoginScreen />
        </Route>
      </Switch>
    </Router>
  )
}
``` 

## Hooks

```javascript
// LoginScreen.js
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const LoginScreen = () => {
  const [email, setEmail] = useState('') // hook for local state, set initial value to empty string
  const [password, setPassword] = useState('')
  const history = useHistory() //
  const dispatch = useDispatch() // this replaces mapDispatch to props and does not need the component to be connected
  
   const checkLogin = () => {
     if (email === userEmail && password === userPassword) {
       dispatch({ type: TYPES.SUCCESSFUL_LOGIN }) // this calls dispatch directly
       console.log('login successful')
       history.push('/') // reroute user 
     } else {
       console.log('login failed!')
     }
   }
// ...
}
```

```javascript
// App.js
import { useSelector } from 'react-redux'

const PrivateRoute = () => {
  const loggedIn = useSelector(state => state.loggedIn) // replaces mapStateToProps and returns value of loggedIn from redux
  if (loggedIn) {
    return <EntryScreen />
  }
  return <LoginScreen />
}

export default App // component no longer needs to be connected
```

# JavaScript

## Arrow Function:

```js
// const functionName = parameter => return
const functionName = () => "Hello"

const addNumbers = (x, y) => x + y
```

## String Literals

```js
`You can use a variable inside a string by ${variable}`
// Must use single ticks for this
```

## Ternary

- Shorthand for an If/ Else statements

```js

const something = (1 === 2) ? 'return if true' : 'return if false'

// if (1 === 2) {
// return 'They are equal'
// } else {
// return 'They are not equal'
// }

```

## Inline Logical && Operator

- Logical operators allow you to define a statement and then if that statement is true it will execute the following code after &&

```js
return randomVariable === anotherVariable && true;
/*
if (randomVariable === anotherVariable){
return true
} else {
 return false
}
*/
```

or 

```js
image.comments && image.comments.map(comment =>
          !comment.deleted && (
            <CommentLayout
              key={`comment-${comment.id}-${image.id}`}
              comment={comment}
              onClick={() => deleteComment(image.id, comment.id)}
            />
          )
        )
```

## Test (with Jest)

```javascript
// Unit tests will test a pure function and are meant to test only one thing
describe('add', () => {
  it('returns the sum of two positive variables given', () => {
      const result = add(1, 2);
      expect(result).toEqual(3)
  })
  it('returns the sum of two negative values given', () => {
    const result = add(-1, -5)
    expect(result).toEqual(-6);
  });
  it('return undefined when given 2 strings', () => {
    const result = add('lucas', 'sasha')
    expect(result).toEqual(undefined);
  })
})
```

```javascript
// HomeScreen.test
import React from 'react'
import { shallow } from 'enzyme'
import { useHistory } from 'react-router-dom' // import methods to mock
import { useSelector } from 'react-redux'
import HomeScreen from '../../main/Home/HomeScreen'
import { MainFeedScreen } from '../../main/Home/MainFeedScreen'

jest.mock('react-router-dom', () => ({ // mocks library
  useHistory: jest.fn(),
}))
jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'), // do not mock anything in this file
  useSelector: jest.fn(), // except this key: set to mock function
}))

describe('<HomeScreen>', () => {
  it('should redirect user to /login when not loggedIn', () => {
    const history = {
      push: jest.fn(),
    }
    useHistory.mockReturnValue(history)
    useSelector.mockReturnValue(false) // mock return value for function
    shallow(<HomeScreen />)
    expect(history.push).toHaveBeenCalledWith('/login')
  })

  it('should return correct component if user is loggedIn', () => {
    useSelector.mockReturnValue(true)
    const wrapper = shallow(<HomeScreen />)
    expect(wrapper.find({ 'data-testid': 'dailyArtPromptApp' })).toHaveLength(1)
  }) // connected components can not be called directly / use a test-id instead
})
```


## Promises

- Promises are a way to combat asynchronous functions by allowing code to run and then return to the promise and execute after

- Promises can either be resolved or rejected. If a promise is resolved it can continue to the .then . If the promise is rejected then it goes to the .catch block

```js
axios.get('https://dog.ceo/api/breeds/image/random')
            .then((response) => {
                console.log('inside the then()')
                setDogImage(response.data.message)
            })
            .catch((error) => {
                console.log("Error fetching picsture", error)
            })
```

## Local Storage

```javascript
// rootReducer.js
import { loadState, saveState } from './localStorage'

export const rootReducer = combineReducers({
  //...reducers
})

const persistedState = loadState() 

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
  rootReducer,
  persistedState, // calls loadState
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

store.subscribe(() => {
  saveState(store.getState()) // saves state to local storage
})

```

```javascript
// localStorage.js

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state') // fetches data saved in local storage
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    // ignore write errors
  }
}


```