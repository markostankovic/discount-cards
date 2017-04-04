import {
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  REQUEST_TAGS,
  RECEIVE_TAGS,
} from '../actions/locations-actions'

const locationsHandler = (state = {
  isFetchingLocations: false,
  isFetchingTags: false,
  locationsData: [],
  tagsData: []
}, action) => {
  switch (action.type) {
    case REQUEST_LOCATIONS:
      return {
        ...state,
        isFetchingLocations: true,
      }
    case REQUEST_TAGS:
      return {
        ...state,
        isFetchingTags: true,
      }
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        isFetchingLocations: false,
        locationsData: action.locationsData
      }
    case RECEIVE_TAGS:
      return {
        ...state,
        isFetchingTags: false,
        tagsData: action.tagsData
      }
    default:
      return state
  }
}

export const locations = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_LOCATIONS:
    case REQUEST_LOCATIONS:
    case RECEIVE_TAGS:
    case REQUEST_TAGS:
      return {
        ...state,
        locationsData: locationsHandler(state.locationsData, action),
        tagsData: locationsHandler(state.tagsData, action),
      }
    default:
      return state
  }
}