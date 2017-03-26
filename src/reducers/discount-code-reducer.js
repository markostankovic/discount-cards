import {
  REQUEST_DISCOUNT_CARD,
  RECEIVE_DISCOUNT_CARD,
  INVALIDATE_DISCOUNT_CARD,
  REGISTERING_NEW_DISCOUNT_CARD,
  REGISTERED_NEW_DISCOUNT_CARD,
} from '../actions/discount-cards-actions'

const codes = (state = {
  isFetching: false,
  didInvalidate: false,
  cardData: null
}, action) => {
  switch (action.type) {
    case INVALIDATE_DISCOUNT_CARD:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_DISCOUNT_CARD:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_DISCOUNT_CARD:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        cardData: action.cardData,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const registerCard = (state = {
  isRegistering: false,
  newCard: null,
}, action) => {
  switch (action.type) {
    case REGISTERING_NEW_DISCOUNT_CARD:
      return {
        ...state,
        isRegistering: true,
        newCard: null,
      }
    case REGISTERED_NEW_DISCOUNT_CARD:
      return {
        ...state,
        isRegistering: false,
        newCard: action.newCard,
      }
  }
}

export const discountCards = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_DISCOUNT_CARD:
    case RECEIVE_DISCOUNT_CARD:
    case REQUEST_DISCOUNT_CARD:
      return {
        ...state,
        codeData: codes(state.codeData, action)
      }
    case REGISTERING_NEW_DISCOUNT_CARD:
    case REGISTERED_NEW_DISCOUNT_CARD:
      return {
        ...state,
        newCard: registerCard(state.newCard, action)
      }
    default:
      return state
  }
}