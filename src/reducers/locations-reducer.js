import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
} from '../actions/locations-actions'

const locationsHandler = (state = {
  isFetchingLocations: false,
  locationsData: [],
  coords: null
}, action) => {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return {
        ...state,
        isFetchingLocations: true,
      }
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        isFetchingLocations: false,
        locationsData: action.locationsData
      }
    default:
      return state
  }
}

export const locations = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
      return {
        ...state,
        locationsData: locationsHandler(state.locationsData, action)
      }
    default:
      return state
  }
}