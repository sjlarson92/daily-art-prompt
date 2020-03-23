import axios from 'axios'
import { validateLogin } from '../../../main/User/Login/authRequests'

jest.mock('axios')

describe('authRequests', () => {
  const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
  const dispatch = jest.fn()
  const history = {
    push: jest.fn(),
  }
  it('should call api with correct params', () => {
    const email = 'fakeItTillYouMakeIt@fakenews.com'
    const password = 'Id rather be reading'
    axios.post.mockResolvedValue('response')
    validateLogin(dispatch, history, email, password)
    expect(axios.post).toHaveBeenCalledWith(`${GATEWAY_URL}/api/login`, null, {
      auth: {
        email,
        password,
      },
    })
  })
})
