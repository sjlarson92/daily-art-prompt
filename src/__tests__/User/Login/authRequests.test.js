import axios from 'axios'
import { validateLogin } from '../../../main/User/Login/authRequests'
import * as TYPES from '../../../main/storage/actions'

jest.mock('axios')

describe('authRequests', () => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  const email = 'fakeItTillYouMakeIt@fakenews.com'
  const password = 'Id rather be reading'
  const dispatch = jest.fn()
  const history = {
    push: jest.fn(),
  }
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('should call api with correct params', async () => {
    axios.post.mockResolvedValue('response')
    await validateLogin(dispatch, history, email, password)
    expect(axios.post).toHaveBeenCalledWith(`${GATEWAY_URL}/api/login`, null, {
      auth: {
        username: email,
        password,
      },
    })
  })

  describe('when api response is resolved', () => {
    it('dispatch action with correct type', async () => {
      const response = 'successful response'
      axios.post.mockResolvedValue(response)
      await validateLogin(dispatch, history, email, password)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.LOGIN,
      })
    })
    it('calls history.push with correct params', async () => {
      const response = 'successful response'
      axios.post.mockResolvedValue(response)
      await validateLogin(dispatch, history, email, password)
      expect(history.push).toHaveBeenCalledWith('/')
    })
  })

  describe('when api response is rejected', () => {
    it('calls dispatch with correct params', async () => {
      const error = {
        response: {
          status: 400,
          headers: {
            message: 'You shall not pass!',
          },
        },
      }
      axios.post.mockRejectedValue(error)
      try {
        await validateLogin(dispatch, history, email, password)
      } catch (e) {
        expect(dispatch).toHaveBeenCalledWith({
          type: TYPES.SET_ERROR_MESSAGE,
          payload: {
            error: 'Incorrect email or password',
          },
        })
      }
    })
  })
})
