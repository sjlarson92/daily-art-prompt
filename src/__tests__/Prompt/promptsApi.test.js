import axios from 'axios'
import { getPromptsAction } from '../../main/Prompt/promptsApi'
import * as TYPES from '../../main/store/actions'

jest.mock('axios')

jest.mock('../../main/DailyArtPromptApp/EntryScreen')

const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

const response = {
  data: {
    prompts: 'array of prompt objects',
  },
}

describe('getPromptsAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call api with correct params', () => {
    axios.get.mockResolvedValue(response)
    getPromptsAction()(dispatch)
    expect(axios.get).toHaveBeenCalledWith(`${GATEWAY_URL}/api/prompts`)
  })
})

describe('when api response is resolved', () => {
  it('should call dispatch with correct parameters', () => {
    axios.get.mockResolvedValue(response)
    getPromptsAction()(dispatch)
    expect(dispatch).toHaveBeenCalledWith({
      type: TYPES.SET_INITIAL_PROMPTS,
      payload: {
        prompts: response.data,
      },
    })
  })
})
describe('when api response is rejected', () => {
  it('should not call dispatch', () => {
    jest.clearAllMocks()
    axios.get.mockRejectedValue()
    getPromptsAction()(dispatch)
    expect(dispatch).not.toHaveBeenCalled()
  })
})
