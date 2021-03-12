import axios from 'axios'
import { createUser } from '../../main/User/userRequests'

jest.mock('axios')

describe('userRequests', () => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  const email = 'someEmail@testing.com'
  const name = 'fake name'
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
    createUser(dispatch, history, email, name, password)
    expect(axios.post).toHaveBeenCalledWith(`${GATEWAY_URL}/api/users`, null, {
      headers: {
        email,
        name,
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
})
