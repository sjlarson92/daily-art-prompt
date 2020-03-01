import axios from 'axios'
import { getImagesAction } from '../../main/Image/imageApi'
import * as TYPES from '../../main/store/actions'

jest.mock('axios')

jest.mock('../../main/DailyArtPromptApp/EntryScreen')

const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

describe('getImagesAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call the api 3 times', () => {
    axios.get.mockResolvedValue({
      data: 'this test was written by a hungry developer',
    })
    const secondFunc = getImagesAction()
    secondFunc(dispatch)
    expect(axios.get).toHaveBeenCalledTimes(3)
  })
  it('should call api with correct params', () => {
    axios.get.mockResolvedValue({
      data: 'are you suggesting that coconuts migrate?',
    })
    getImagesAction()(dispatch)
    expect(axios.get).toHaveBeenCalledWith(`${GATEWAY_URL}/api/images/1`)
  })

  describe('when api response is resolved', () => {
    it('should call dispatch with corret params', async () => {
      axios.get.mockResolvedValue({
        data: 'some image object',
      })
      await getImagesAction()(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_INITIAL_IMAGES,
        payload: {
          image: 'some image object',
        },
      })
    })
  })
  describe('when api response is rejected', () => {
    it('should not call dispatch', async () => {
      axios.get.mockRejectedValue()
      await getImagesAction()(dispatch)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})