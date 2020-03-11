import axios from 'axios'
import { createUser } from '../../main/SignUp/createUserApi'

jest.mock('axios')

const dispatch = jest.fn()
const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL
const email = 'someEmail@testing.com'
const password = 'fakePassord'

describe('createUser', () => {
  it('should call api with correct params', () => {
    axios.post.mockResolvedValue(null)
    createUser(dispatch, email, password)
    expect(axios.post).toHaveBeenCalledWith(`${GATEWAY_URL}/api/users`, null, {
      headers: {
        email,
        password,
      },
    })
  })

  describe('when api response is resolved', () => {})
  describe('when api response is rejected', () => {})
})
