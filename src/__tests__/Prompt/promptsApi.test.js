import axios from 'axios'
import { when } from 'jest-when'
import { getPromptByDate } from '../../main/Prompt/promptsApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('axios')

const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const date = '2021-03-06'
const prompt = { text: 'i am a prompt' }
const response = {
  data: {
    prompt,
  },
}

describe('getPromptByDate', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call api with correct params', () => {
    axios.get.mockResolvedValue(response)
    getPromptByDate(dispatch, date)
    expect(axios.get).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/prompts?date=${date}`,
    )
  })

  describe('when api response is resolved', () => {
    it('should call dispatch with correct parameters', async () => {
      when(axios.get)
        .calledWith(`${GATEWAY_URL}/api/prompts?date=${date}`)
        .mockResolvedValue(response)
      await getPromptByDate(dispatch, date)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_CURRENT_PROMPT,
        payload: {
          prompt: response.data,
        },
      })
    })
  })
})
