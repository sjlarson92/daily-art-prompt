import React from 'react'
import { shallow } from 'enzyme'
import { ImageLayout, mapDispatchToProps } from '../../main/Image/ImageLayout'
import * as TYPES from '../../main/storage/actions'

const defaultProps = {
  deleteComment: jest.fn(),
  updateCommentEditing: jest.fn(),
  editComment: jest.fn(),
  addComment: jest.fn(),
  image: {
    id: 1,
    liked: true,
    comments: [
      {
        id: 1,
        text: 'comment',
      },
      {
        id: 2,
        text: 'tests are fun',
        deleted: true,
      },
    ],
  },
}

describe('<ImageLayout />', () => {
  let wrapper
  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallow(<ImageLayout {...defaultProps} />)
  })

  describe('Image', () => {
    it('should render with correct image', () => {
      expect(wrapper.find({ 'data-testid': 'image' }).prop('image')).toEqual(
        defaultProps.image,
      )
    })
  })

  describe('<div> LikedDiv', () => {
    it('has correct className', () => {
      expect(
        wrapper.find({ 'data-testid': 'likedDiv' }).prop('className'),
      ).toEqual('likedText')
    })

    it('should render correct text for likedDiv', () => {
      expect(wrapper.find({ 'data-testid': 'likedDiv' }).text()).toEqual(
        'Liked',
      )
    })
  })

  describe('<CommentLayout/>', () => {
    it('should render CommentLayout for each comment in array that is not deleted', () => {
      expect(wrapper.find('CommentLayout')).toHaveLength(1)
    })

    it('should pass correct comment prop', () => {
      expect(
        wrapper.find({ 'data-testid': 'comment-1' }).prop('comment'),
      ).toEqual(defaultProps.image.comments[0])
    })

    describe('onDelete', () => {
      it('should call deleteComment with correct params onDelete', () => {
        wrapper.find({ 'data-testid': 'comment-1' }).simulate('delete')
        expect(defaultProps.deleteComment).toHaveBeenCalledWith(
          defaultProps.image.id,
          defaultProps.image.comments[0].id,
        )
      })
    })

    describe('onEdit', () => {
      it('should call updateCommentEditing with correct params', () => {
        const props = {
          ...defaultProps,
          image: {
            ...defaultProps.image,
            comments: [
              {
                id: 1,
                editing: false,
              },
            ],
          },
        }
        wrapper = shallow(<ImageLayout {...props} />)
        wrapper.find({ 'data-testid': 'comment-1' }).simulate('edit')
        expect(defaultProps.updateCommentEditing).toHaveBeenCalledWith(
          props.image.id,
          props.image.comments[0].id,
          props.image.comments[0].editing,
        )
      })
    })

    describe('onCancel', () => {
      it('should call updateCommentEditing with correct params onCancel', () => {
        const props = {
          ...defaultProps,
          image: {
            ...defaultProps.image,
            comments: [
              {
                id: 1,
                editing: true,
              },
            ],
          },
        }
        wrapper = shallow(<ImageLayout {...props} />)
        wrapper.find({ 'data-testid': 'comment-1' }).simulate('cancel')
        expect(defaultProps.updateCommentEditing).toHaveBeenCalledWith(
          props.image.id,
          props.image.comments[0].id,
          props.image.comments[0].editing,
        )
      })
    })

    describe('onSubmit', () => {
      describe('when user clicks enter', () => {
        it('should call editComment with correct params onSubmit', () => {
          wrapper.find({ 'data-testid': 'comment-1' }).simulate('submit', {
            keyCode: 13,
            target: { value: 'updated comment' },
          })
          expect(defaultProps.editComment).toHaveBeenCalledWith(
            1,
            1,
            'updated comment',
          )
        })
      })

      describe('when user does not click enter', () => {
        it('should not call editComment', () => {
          wrapper
            .find({ 'data-testid': 'comment-1' })
            .simulate('submit', { keyCode: 10 })
          expect(defaultProps.editComment).not.toHaveBeenCalledWith()
        })
      })
    })
  })

  describe('input', () => {
    it('should have correct type prop', () => {
      expect(wrapper.find({ 'data-testid': 'inputBox' }).prop('type')).toEqual(
        'text',
      )
    })

    describe('when onChange is called', () => {
      it('should update value to user input', () => {
        wrapper
          .find({ 'data-testid': 'inputBox' })
          .simulate('change', { target: { value: 'new comment' } })
        expect(
          wrapper.find({ 'data-testid': 'inputBox' }).prop('value'),
        ).toEqual('new comment')
      })
    })

    describe('when onKeyDown is called', () => {
      describe('when user clicks enter', () => {
        it('should call addComment with correct params', () => {
          wrapper.find({ 'data-testid': 'inputBox' }).simulate('keyDown', {
            keyCode: 13,
            target: { value: 'new comment' },
          })
          expect(defaultProps.addComment).toHaveBeenCalledWith('new comment', 1)
        })

        it('should set input value to an empty string', () => {
          wrapper.find({ 'data-testid': 'inputBox' }).simulate('keyDown', {
            keyCode: 13,
            target: { value: 'new comment' },
          })
          expect(
            wrapper.find({ 'data-testid': 'inputBox' }).prop('value'),
          ).toEqual('')
        })
      })

      describe('when user clicks a key that does not equal to enter', () => {
        it('should not call addComment', () => {
          wrapper
            .find({ 'data-testid': 'inputBox' })
            .simulate('keyDown', { keyCode: 4 })
          expect(defaultProps.addComment).not.toHaveBeenCalled()
        })
      })
    })

    describe('placeholder', () => {
      it('should equal correct text', () => {
        expect(
          wrapper.find({ 'data-testid': 'inputBox' }).prop('placeholder'),
        ).toEqual('Add Comment...')
      })
    })
  })
})

describe('mapDispatchToProps', () => {
  const dispatch = jest.fn()

  describe('deleteComment', () => {
    it('should call dispatch with type: DELETE_COMMENT and correct payload', () => {
      mapDispatchToProps(dispatch).deleteComment(1, 1)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.DELETE_COMMENT,
        payload: {
          imageId: 1,
          commentId: 1,
        },
      })
    })
  })

  describe('updateCommentEditing', () => {
    it('should call dispatch with type: UPDATE_COMMENT_EDITING and correct payload', () => {
      mapDispatchToProps(dispatch).updateCommentEditing(1, 1, false)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.UPDATE_COMMENT_EDITING,
        payload: {
          imageId: 1,
          commentId: 1,
          editing: false,
        },
      })
    })
  })

  describe('editComment', () => {
    it('should call dispatch with type: EDIT_COMMENT and correct params', () => {
      mapDispatchToProps(dispatch).editComment(1, 1, 'updated comment')
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.EDIT_COMMENT,
        payload: {
          imageId: 1,
          commentId: 1,
          value: 'updated comment',
        },
      })
    })
  })

  describe('addComment', () => {
    it('should call dispatch with correct TYPE and payload', () => {
      mapDispatchToProps(dispatch).addComment('comment', 1)
      expect(dispatch).toHaveBeenCalledWith({
        type: TYPES.ADD_COMMENT,
        payload: {
          imageId: 1,
          value: 'comment',
        },
      })
    })
  })
})
