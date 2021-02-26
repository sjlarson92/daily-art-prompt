import * as TYPES from '../../main/storage/actions'
import { imagesReducer } from '../../main/Image/imagesReducer'

describe('imagesReducer', () => {
  describe(`when action.type equals ${TYPES.SET_USER_IMAGES}`, () => {
    describe('when there is no images in state', () => {
      it('should return new images', () => {
        const images = [
          {
            id: '1',
            userId: '1',
            src: 'someSrc',
          },
          {
            id: '2',
            userId: '1',
            src: 'diffSrc',
          },
        ]

        const state = []
        const action = {
          type: TYPES.SET_USER_IMAGES,
          payload: {
            images,
          },
        }
        expect(imagesReducer(state, action)).toEqual(images)
      })
    })
    describe('when there are images in state', () => {
      it('should return updatedImages with previous state and new Image', () => {
        const newImage = {
          id: 'some id 1',
          userId: 'some user id',
          src: 'someSrc',
        }
        const oldImage = {
          id: 2,
          src: 'firstImage',
          liked: false,
          comments: [],
        }

        const action = {
          type: TYPES.SET_USER_IMAGES,
          payload: {
            images: [newImage],
          },
        }
        const expectedResult = [oldImage, newImage]
        expect(imagesReducer([oldImage], action)).toEqual(expectedResult)
      })
    })
    describe('when image received is null or undefined', () => {
      it('should return state unchanged', () => {
        const state = [
          {
            id: 'some id 1',
            userId: 'some user id',
            src: 'someSrc',
          },
        ]
        const action = {
          type: TYPES.SET_USER_IMAGES,
          payload: {
            images: null,
          },
        }
        expect(imagesReducer(state, action)).toEqual(state)
      })
    })
  })

  describe(`action is ${TYPES.ADD_IMAGE}`, () => {
    it('returns state with new image added', () => {
      const state = [
        {
          id: 1,
        },
      ]
      const action = {
        type: TYPES.ADD_IMAGE,
        payload: {
          image: {
            id: 2,
          },
        },
      }
      expect(imagesReducer(state, action)).toEqual([
        ...state,
        {
          id: 2,
        },
      ])
    })
  })

  describe('when the action.type equals UPDATE_IMAGE_LIKED', () => {
    describe('when image.id equals payload.imageId and image.liked is false', () => {
      it('should update image.liked to true', () => {
        const state = [
          {
            id: 1,
            liked: false,
          },
        ]
        const action = {
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            updatedImage: { id: 1, liked: true },
          },
        }
        expect(imagesReducer(state, action)).toEqual([
          {
            id: 1,
            liked: true,
          },
        ])
      })
    })
    describe('when image.id equals payload.imageId and when image.liked is true', () => {
      it('should update image.liked to false', () => {
        const state = [
          {
            id: 1,
            liked: true,
          },
        ]
        const action = {
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            updatedImage: { id: 1, liked: false },
          },
        }
        expect(imagesReducer(state, action)).toEqual([
          {
            id: 1,
            liked: false,
          },
        ])
      })
    })

    describe('when image.id does not equal payload.imageId', () => {
      it('should return the image unchanged', () => {
        const state = [
          {
            id: 1,
            liked: true,
          },
        ]
        const action = {
          type: TYPES.UPDATE_IMAGE_LIKED,
          payload: {
            updatedImage: { id: 2 },
          },
        }
        expect(imagesReducer(state, action)).toEqual([
          {
            id: 1,
            liked: true,
          },
        ])
      })
    })
  })

  describe('when action.type does not equal any of the cases', () => {
    describe('when goes to the default case', () => {
      it('should return the state unchanged', () => {
        const state = []
        const action = {
          type: '',
        }
        expect(imagesReducer(state, action)).toEqual(state)
      })
    })
  })
})
