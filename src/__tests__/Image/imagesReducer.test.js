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

  describe('when the action.type equals UPDATE_PROMPT_IMAGES', () => {
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
            imageId: 1,
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
            imageId: 1,
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
            imageId: 2,
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

  describe('when the action.type equals ADD_COMMENT', () => {
    describe('when image.id equals payload.imageId', () => {
      describe('when there are no previous comments', () => {
        it('should return image with new comment added', () => {
          const state = [
            {
              id: 1,
              comments: [],
            },
          ]
          const action = {
            type: TYPES.ADD_COMMENT,
            payload: {
              imageId: 1,
              value: 'new comment',
            },
          }
          expect(imagesReducer(state, action)).toEqual([
            {
              id: 1,
              comments: [
                {
                  id: 1,
                  text: 'new comment',
                },
              ],
            },
          ])
        })
      })
      describe('when there are previous comments', () => {
        it('should return image with new comment added', () => {
          const state = [
            {
              id: 1,
              comments: [{ id: 1 }],
            },
          ]
          const action = {
            type: TYPES.ADD_COMMENT,
            payload: {
              imageId: 1,
              value: 'new comment',
            },
          }
          expect(imagesReducer(state, action)).toEqual([
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
                {
                  id: 2,
                  text: 'new comment',
                },
              ],
            },
          ])
        })
      })
    })
    describe('when image.id does not equal payload.imageId', () => {
      it('should return image unchanged', () => {
        const state = [
          {
            id: 1,
            comments: [],
          },
        ]
        const action = {
          type: TYPES.ADD_COMMENT,
          payload: {
            imageId: 2,
            value: 'new comment',
          },
        }
        expect(imagesReducer(state, action)).toEqual(state)
      })
    })
  })

  describe('when action.type equals DELETE_COMMENT', () => {
    describe('when image.id equals imageId given', () => {
      describe('when comment.id equals commentId given', () => {
        it('should return comment with deleted attribute true', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.DELETE_COMMENT,
            payload: {
              imageId: 1,
              commentId: 1,
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0].deleted).toEqual(true)
        })
      })
      describe('when comment.id does not equal commentId given', () => {
        it('should return comment unchanged', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.DELETE_COMMENT,
            payload: {
              imageId: 1,
              commentId: 2,
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0]).toEqual(state[0].comments[0])
        })
      })
    })
    describe('when image.id does not equal imageId given', () => {
      it('should return image unchanged', () => {
        const state = [
          {
            id: 1,
            comments: [
              {
                id: 1,
              },
            ],
          },
        ]
        const action = {
          type: TYPES.DELETE_COMMENT,
          payload: {
            imageId: 2,
            commentId: 1,
          },
        }
        const result = imagesReducer(state, action)
        expect(result[0]).toEqual(state[0])
      })
    })
  })

  describe('when action.type equals UPDATE_COMMENT_EDITING', () => {
    describe('when image.id === imageId given', () => {
      describe('when comment.id === commentId given', () => {
        it('should return comment with editing attribute updated', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.UPDATE_COMMENT_EDITING,
            payload: {
              imageId: 1,
              commentId: 1,
              editing: false,
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0].editing).toEqual(!action.payload.editing)
        })
      })
      describe('when comment.id does not equal commentId given', () => {
        it('should return comment unchanged', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.UPDATE_COMMENT_EDITING,
            payload: {
              imageId: 1,
              commentId: 2,
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0]).toEqual(state[0].comments[0])
        })
      })
    })
    describe('when image.id does not equal imageId given', () => {
      it('should return image unchanged', () => {
        const state = [
          {
            id: 1,
            comments: [
              {
                id: 1,
              },
            ],
          },
        ]
        const action = {
          type: TYPES.UPDATE_COMMENT_EDITING,
          payload: {
            imageId: 2,
            commentId: 1,
          },
        }
        const result = imagesReducer(state, action)
        expect(result[0]).toEqual(state[0])
      })
    })
  })

  describe('when action.type equals EDIT_COMMENT', () => {
    describe('when image.id equals imageId given', () => {
      describe('when comment.id equals commentId given', () => {
        it('should return comment with updated text value and editing attribute set to false', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.EDIT_COMMENT,
            payload: {
              imageId: 1,
              commentId: 1,
              value: 'updated comment',
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0]).toEqual({
            id: 1,
            text: 'updated comment',
            editing: false,
          })
        })
      })
      describe('when commend.id does not equal commentId given', () => {
        it('should return comment unchanged', () => {
          const state = [
            {
              id: 1,
              comments: [
                {
                  id: 1,
                },
              ],
            },
          ]
          const action = {
            type: TYPES.EDIT_COMMENT,
            payload: {
              imageId: 1,
              commentId: 2,
            },
          }
          const result = imagesReducer(state, action)
          expect(result[0].comments[0]).toEqual(state[0].comments[0])
        })
      })
    })
    describe('when image.id does not equal imageId given', () => {
      it('should return image unchanged', () => {
        const state = [
          {
            id: 1,
            comments: [
              {
                id: 1,
              },
            ],
          },
        ]
        const action = {
          type: TYPES.EDIT_COMMENT,
          payload: {
            imageId: 2,
            commentId: 1,
          },
        }
        const result = imagesReducer(state, action)
        expect(result[0]).toEqual(state[0])
      })
    })
  })

  describe('when action is LOGOUT', () => {
    it('should return empty array', () => {
      const state = ['image', 'image2']
      const action = {
        type: TYPES.LOGOUT,
      }
      const result = imagesReducer(state, action)
      expect(result).toEqual([])
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
