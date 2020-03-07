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

- Connect your store to the components that will be need it

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



# Deconstructing from state

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

## JSX

JSX in a react app should utilize just one div within the body tags.

## Components

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

## Add Image in React:

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