import {
  REQUEST_CODE,
  RECEIVE_CODE,
  INVALIDATE_CODE
} from '../actions/discount-cards-actions'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_CODE:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CODE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CODE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export const discountCards = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_CODE:
    case RECEIVE_CODE:
    case REQUEST_CODE:
      return {
        ...state,
        codeData: posts(state.codeData, action)
      }
    default:
      return state
  }
}