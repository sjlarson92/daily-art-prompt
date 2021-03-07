import axios from 'axios'
import { when } from 'jest-when'
import {
  updateLikeImageAction,
  getImagesByPromptAndUserId,
  uploadImageAction,
} from '../../main/Image/imageApi'
import * as TYPES from '../../main/storage/actions'

jest.mock('axios')

const dispatch = jest.fn()

const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL

describe('getImagesByPromptAndUserId', () => {
  const user = { id: 1 }
  const currentPromptId = 1
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should call api with correct params', () => {
    axios.get.mockResolvedValue({
      data: 'are you suggesting that coconuts migrate?',
    })
    getImagesByPromptAndUserId(dispatch, user, currentPromptId)
    expect(axios.get).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/images?promptId=${currentPromptId}&userId=${user.id}`,
    )
  })

  describe('when api response is resolved', () => {
    it('should call dispatch with correct params', async () => {
      const images = ['image1', 'image2']
      when(axios.get)
        .calledWith(
          `${GATEWAY_URL}/api/images?promptId=${currentPromptId}&userId=${user.id}`,
        )
        .mockResolvedValue({
          data: images,
        })
      await getImagesByPromptAndUserId(dispatch, user, currentPromptId)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.SET_USER_IMAGES,
        payload: {
          images,
        },
      })
    })
  })
})

describe('updateLikeImageAction', () => {
  const updatedImage = { id: 1 }
  it('call api with correct params', () => {
    axios.put.mockResolvedValue({ data: 'how do you like me now?' })
    updateLikeImageAction(updatedImage, dispatch)
    expect(axios.put).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/images/${updatedImage.id}`,
      updatedImage,
    )
  })
  describe('when api response is resolved', () => {
    it('should call dispatch with correct params', async () => {
      when(axios.put)
        .calledWith(
          `${GATEWAY_URL}/api/images/${updatedImage.id}`,
          updatedImage,
        )
        .mockResolvedValue({
          data: updatedImage,
        })
      await updateLikeImageAction(updatedImage, dispatch)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.UPDATE_IMAGE,
        payload: {
          updatedImage,
        },
      })
    })
  })
})

describe('uploadImageAction', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const imageDescription = 'some description'
  const insertedImage = 'some image'
  const currentPromptId = 1
  const id = 'some id'
  const formData = new FormData()
  formData.append('description', imageDescription)
  formData.append('file', insertedImage)

  it('call api with correct params', () => {
    axios.post.mockResolvedValue({
      status: 201,
      data: 'some response data',
    })
    uploadImageAction(
      id,
      currentPromptId,
      imageDescription,
      insertedImage,
      dispatch,
    )
    expect(axios.post).toHaveBeenCalledWith(
      `${GATEWAY_URL}/api/users/${id}/images?promptId=${currentPromptId}`,
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
        await uploadImageAction(
          id,
          currentPromptId,
          imageDescription,
          insertedImage,
          dispatch,
        )
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
          currentPromptId,
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
          currentPromptId,
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
        uploadImageAction(
          id,
          currentPromptId,
          imageDescription,
          insertedImage,
          dispatch,
        )
        expect(dispatch).not.toHaveBeenCalled()
      })
    })
  })
  describe('when response is rejected', () => {
    it('returns alert with correct values', async () => {
      axios.post.mockRejectedValue()
      const response = await uploadImageAction(
        id,
        currentPromptId,
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
