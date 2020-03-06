# Daily Art Prompt Web App (React)


- Functional Component Example: 
```js
const fComponent = (parameters) => {

return (
    <div>
      <div>
        JSX you want to return
      </div>
      <Component 
        props= { parameter }
      />
    </div>
)

}
```

- run javascript from terminal with ` node filename.js`

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

## Setting up react app with Create React App

1. Create an js app with Create React App with command:

`yarn create react-app app-name`

2. To install dependencies:

`yarn add dependencyName`

3. Start app (you must be in the app folder)

`yarn start`

NOTE: do not push dependencies to gitHub, these are installed by using `yarn` or `yarn install` and looking at the yarn.lock file

## Testing with Jest:

- Run all tests`yarn test`

- Test specific file `yarn test -- fileName`

- Test specific test in file `yarn test -- fileName -t 'testName' `

## Redux

- Global state used to share with multiple components

### Set Up
To setup Redux, these packages are required: redux, react-redux, and redux-thunk

`yarn add redux` `yarn add react-redux` `yarn add redux-thunk`

- Set up boilerplate:

```js
export const rootReducer = combineReducers({
    globalStateProp : data
})
```
- rootReducer contains the data that is saved to redux, now we pass this into creatStore() and save it as store

`const store = createStore(rootReducer)`

- Wrap Application in <Provider> and pass in store as a prop

```js
ReactDOM.render(
  <Provider store={store}>
    <DailyArtPromptApp />
  </Provider>,
  document.getElementById('root')
);
```

- Connect your store to the compenents that will be need it

```js
const mapStateToProps = (state) => ({
  stateProp: state.prop
})

const mapDispatchToProps = (dispatch) => ({
  actionProp: (var) => dispatch({
    type: 'ACTION_TYPE', payload: {
      var
    }
  })
})

const ConnnectedDailyArtPrompt = connect(mapStateToProps, mapDispatchToProps)(App)
```
- Now you are able to pull these from props in the current file

- The global state can be changed by using reducers that are called by using actions (a switch case if preferred to be used for this because of the different action.types):

```js
const reducer = (state, action) => {
    switch (action.type) {
        case 'ACTION_TYPE':
            const updatedProps = state.map(object => {
                if (object.id === action.payload.givenId) {
                    return {
                        ...object,
                        attribute: 'updatedAttribute',
                    }
                } else {
                    return object;
                }
            })
            return updatedProps

        default:
            return defaultProps
    }
}
```


# Hooks

- Allows developer to use state and lifecycle methods in a functional component.

```js
 // Import useState from react 
const [stateVar, setStateVar] = useState(initialValue)
```

## Notes

1. JSX

JSX in a react app should utilize just one div within the body tags.

2. Components

- render always takes a component NOT a function

```js
// YES
ReactDOM.render(<App/>, document.getElementById('root'));

// NO
ReactDOM.render(App(), document.getElementById('root'));
```

- (Only for React and also because we are using it to return JSX)

```js
// const FuntionName = parameter => return
const FunctionName = () => <h1>Return</h1>
```

3. Add Image with React:

- You need to first import the Image and then use the var you imported to use it as a source for the image component

```js
import image from './imageName.jpg'

<img src={image}/>
```

4. Classes and Ids

- use the keyterms of className and id to add classes and ids to components

```js
<div className="class" id="id">
```

## Deconstructing from state

```js
const CommentLayout = ({ comment, onDelete, onCancel, onEdit, onSubmit }) => (
  <div>
    <Comment comment={comment.text} />
    {!comment.editing ? (
      <div data-testid="nonEditingDiv">
        <button name="deleteButton" onClick={onDelete}>
          Delete
        </button>
        <button type="button" name="editButton" onClick={onEdit}>
          Edit
        </button>
      </div>
    ) : (
      <div data-testid="editingDiv">
        <input
          name="editInputBox"
          defaultValue={comment.text}
          onKeyDown={onSubmit}
        />
        <button type="button" name="cancelButton" onClick={onCancel}>
          Cancel
        </button>
      </div>
    )}
  </div>
)
```

### Note:

- Any time state or props get changed then those components/part of the DOM get re-rendered.

# Testing with Jest (Enzyme)

## Yarn Commands

`yarn test`

Test specific file:
`yarn test -- fileName`

- Import the file you want to test

- Set defaultProps at the top of the file to use in tests as dummy parameters

- To test components `import { shallow } from 'enzyme'`

```js
const defaultProps = {
  comment: 'text',
}

describe('<Comment />', () => {
  it('should render with correct comment', () => {
    const wrapper = shallow(<Comment {...defaultProps} />)
    expect(
      wrapper
        .find({ 'data-testid': 'commentDiv' })
        .childAt(0)
        .text(),
    ).toEqual(defaultProps.comment)
  })
})
```