import transformLocaions from '../api-wrapper/transformers/locations';
export const REQUEST_LOCATIONS = 'REQUEST_LOCATIONS';
export const RECEIVE_LOCATIONS = 'RECEIVE_LOCATIONS';

export const requestLocations = coords => ({
  type: REQUEST_LOCATIONS,
  coords
});

export const receiveLocations = (json) => ({
  type: RECEIVE_LOCATIONS,
  locationsData: json.length > 0 ? transformLocaions.fromAPIModel(json) : [],
});

export const fetchLocations = coords => dispatch => {
  dispatch(requestLocations(coords));

  const query = coords ? {
    lat_less: coords.latitude - coords.latitudeDelta,
    lat_grater: coords.latitude + coords.latitudeDelta,
    lon_less: coords.longitude - coords.longitudeDelta,
    lon_grater: coords.longitude + coords.longitudeDelta,
  } : null;

  return fetch('http://gotravelersdiscount.com/locations')
    .then(response => response.json())
    .then(json => dispatch(receiveLocations(json)))
}