import {
  REQUEST_ALL_DISTRIBUTORS,
  RECEIVE_ALL_DISTRIBUTORS,
} from '../actions/distributors-actions'

const distributorsHandler = (state = {
  isFetchingDistributors: false,
  distributorsData: []
}, action) => {
  switch (action.type) {
    case REQUEST_ALL_DISTRIBUTORS:
      return {
        ...state,
        isFetchingDistributors: true
      }
    case RECEIVE_ALL_DISTRIBUTORS:
      return {
        ...state,
        isFetchingDistributors: false,
        distributorsData: action.distributorsData
      }
    default:
      return state
  }
}

export const distributors = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_ALL_DISTRIBUTORS:
    case REQUEST_ALL_DISTRIBUTORS:
      return {
        ...state,
        distributorsData: distributorsHandler(state.distributorsData, action)
      }
    default:
      return state
  }
}