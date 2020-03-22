import axios from 'axios'
import { createUser } from '../../main/User/userRequests'
import * as TYPES from '../../main/storage/actions'

jest.mock('axios')

describe('userRequests', () => {
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
    it('call history.push with correct params', async () => {
      axios.post.mockResolvedValue(response)
      await createUser(dispatch, history, email, password)
      expect(history.push).toHaveBeenCalledWith('/login', {
        message: 'Successfully Created New Account',
      })
    })
  })

  describe('when api response is rejected', () => {
    describe('with status code 409', () => {
      it('dispatch action with correct type and payload', async () => {
        const error = {
          error: {
            response: {
              status: 409,
              headers: {
                message: 'Can you believe its snowing in April?',
              },
            },
          },
        }
        axios.post.mockRejectedValue(error)
        try {
          await createUser(dispatch, history, email, password)
        } catch (e) {
          expect(dispatch).toHaveBeenCalledWith({
            type: TYPES.SET_ERROR_MESSAGE,
            payload: {
              error: error.response.headers.message,
            },
          })
        }
      })
    })
    describe('with any unsuccessful code not 409', () => {
      it('dispatch action with correct type and payload', async () => {
        const error = {
          error: {
            response: {
              status: 400,
              headers: {
                message: 'The end is nigh!',
              },
            },
          },
        }
        axios.post.mockRejectedValue(error)
        try {
          await createUser(dispatch, history, email, password)
        } catch (e) {
          expect(dispatch).toHaveBeenCalledWith({
            type: TYPES.SET_ERROR_MESSAGE,
            payload: {
              error: 'An error occurred. Please try again.',
            },
          })
        }
      })
    })
  })
})
