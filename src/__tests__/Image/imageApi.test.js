import axios from 'axios'
import { when } from 'jest-when'
import { getImagesAction, uploadImageAction } from '../../main/Image/imageApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('axios')

const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

describe('getImagesAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call api with correct params', () => {
    const id = 'some id'
    axios.get.mockResolvedValue({
      data: 'are you suggesting that coconuts migrate?',
    })
    getImagesAction(id)(dispatch)
    expect(axios.get).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/users/${id}/images`,
    )
  })

  describe('when api response is resolved', () => {
    it('should call dispatch with correct params', async () => {
      const images = ['image1', 'image2']
      const id = 1
      when(axios.get)
        .calledWith(`${GATEWAY_URL}/api/users/${id}/images`)
        .mockResolvedValue({
          data: images,
        })
      await getImagesAction(id)(dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_USER_IMAGES,
        payload: {
          images,
        },
      })
    })
  })
  describe('when api response is rejected', () => {
    it('should not call dispatch', async () => {
      axios.get.mockRejectedValue()
      await getImagesAction(1)(dispatch)
      expect(dispatch).not.toHaveBeenCalled()
    })
  })
})

describe('uploadImageAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const imageDescription = 'some description'
  const insertedImage = 'some image'
  const id = 'some id'
  const formData = new FormData()
  formData.append('description', imageDescription)
  formData.append('file', insertedImage)

  it('call api with correct params', () => {
    axios.post.mockResolvedValue({
      status: 201,
      data: 'some response data',
    })
    uploadImageAction(id, imageDescription, insertedImage, dispatch)
    expect(axios.post).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/users/${id}/images`,
      formData,
    )
  })
  describe('when response is resolved', () => {
    describe('when status is 201', () => {
      it(`should dispatch ${TYPES.ADD_IMAGE} with correct payload`, async () => {
        axios.post.mockResolvedValue({
          status: 201,
          data: 'some response data',
        })
        await uploadImageAction(id, imageDescription, insertedImage, dispatch)
        expect(dispatch).toHaveBeenCalledWith({
          type: TYPES.ADD_IMAGE,
          payload: { image: 'some response data' },
        })
      })
      it('return alert with correct values', async () => {
        axios.post.mockResolvedValue({
          status: 201,
          data: 'some response data',
        })
        const response = await uploadImageAction(
          id,
          imageDescription,
          insertedImage,
          dispatch,
        )
        expect(response).toEqual({
          message: 'Image has been saved',
          variant: 'success',
        })
      })
    })
    describe('when status is NOT 201', () => {
      it('returns alert with correct values', async () => {
        axios.post.mockResolvedValue({
          status: 400,
        })
        const response = await uploadImageAction(
          id,
          imageDescription,
          insertedImage,
          dispatch,
        )
        expect(response).toEqual({
          message: 'Failed to save image. Please try again.',
          variant: 'danger',
        })
      })
      it('does not call dispatch', () => {
        axios.post.mockResolvedValue({
          status: 400,
        })
        uploadImageAction(id, imageDescription, insertedImage, dispatch)
        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
  describe('when response is rejected', () => {
    it('returns alert with correct values', async () => {
      axios.post.mockRejectedValue()
      const response = await uploadImageAction(
        id,
        imageDescription,
        insertedImage,
        dispatch,
      )
      expect(response).toEqual({
        message: 'Failed to save image. Please try again.',
        variant: 'danger',
      })
    })
  })
})
