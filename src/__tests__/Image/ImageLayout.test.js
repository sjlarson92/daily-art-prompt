import { useDispatch, useSelector } from 'react-redux'
import { shallow } from 'enzyme'
import React from 'react'
import ImageLayout from '../../main/Image/ImageLayout'

jest.mock('react-redux', () => ({
  ...require.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

const user = {
  id: 'some id',
  email: 'SomeUser',
}

const mockState = {
  user,
}

const defaultProps = {
  image: {
    id: 'some id',
  },
}

const dispatch = jest.fn()

describe('<ImageLayout>', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    useSelector.mockImplementation(callback => callback(mockState))
    useDispatch.mockReturnValue(dispatch)
  })
  describe('LikeImageIcon', () => {
    describe('when clicked', () => {
      it('dispatch with correct params', () => {
        const wrapper = shallow(<ImageLayout {...defaultProps} />)
        wrapper.find('FontAwesomeIcon').simulate('click')
        // TODO: finish this test
      })
    })
  })
})
