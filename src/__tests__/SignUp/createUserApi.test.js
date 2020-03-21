import axios from 'axios'
import { createUser } from '../../main/SignUp/createUserApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('axios')

describe('createUser', () => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  const email = 'someEmail@testing.com'
  const password = 'fakePassword'
  const response = 'some Response'
  const dispatch = jest.fn()
  const history = {
    push: jest.fn(),
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call api with correct params', () => {
    axios.post.mockResolvedValue(response)
    createUser(dispatch, history, email, password)
    expect(axios.post).toHaveBeenCalledWith(`${GATEWAY_URL}/api/users`, null, {
      headers: {
        email,
        password,
      },
    })
  })

  describe('when api response is resolved', () => {
    it('dispatch action with correct type and payload', async () => {
      axios.post.mockResolvedValue(response)
      await createUser(dispatch, history, email, password)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_ERROR_MESSAGE,
        payload: {
          error: '',
        },
      })
    })
    it('call history.push with correct params', async () => {
      axios.post.mockResolvedValue(response)
      await createUser(dispatch, history, email, password)
      expect(history.push).toHaveBeenCalledWith('/login', {
        message: 'Successfully Created New Account',
      })
    })
  })

  describe('when api response is rejected', () => {
    it('dispatch action with correct type and payload', async () => {
      axios.post.mockRejectedValue({ message: 'Mayday! We are out of wine!' })
      try {
        await createUser(dispatch, history, email, password)
      } catch (e) {
        expect(dispatch).toHaveBeenCalled()
      }
    })
  })
})
