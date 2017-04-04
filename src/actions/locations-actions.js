import transformLocaions from '../api-wrapper/transformers/locations';
import transformTags from '../api-wrapper/transformers/tags';
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';
export const REQUEST_TAGS = 'REQUEST_TAGS';
export const RECEIVE_TAGS = 'RECEIVE_TAGS';

export const requestLocations = coords => ({
  type: REQUEST_LOCATIONS,
  coords
});

export const requestTags = coords => ({
  type: REQUEST_TAGS
});

export const receiveLocations = (json) => ({
  type: RECEIVE_LOCATIONS,
  locationsData: json.length > 0 ? transformLocaions.fromAPIModel(json) : [],
});

export const receiveTags = (json) => ({
  type: RECEIVE_TAGS,
  tagsData: json.length > 0 ? transformTags.fromAPIModel(json) : [],
});

export const fetchLocations = coords => dispatch => {
  dispatch(requestLocations(coords));

  return fetch('http://gotravelersdiscount.com/locations')
    .then(response => response.json())
    .then(json => dispatch(receiveLocations(json)))
}

export const fetchTags = coords => dispatch => {
  dispatch(requestTags(coords));

  return fetch('http://gotravelersdiscount.com/tags')
    .then(response => response.json())
    .then(json => dispatch(receiveTags(json)))
}