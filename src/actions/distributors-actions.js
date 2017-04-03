import transformDistributors from '../api-wrapper/transformers/distributors';
export const REQUEST_ALL_DISTRIBUTORS = 'REQUEST_ALL_DISTRIBUTORS';
export const RECEIVE_ALL_DISTRIBUTORS = 'RECEIVE_ALL_DISTRIBUTORS';

export const requestDistributors = codeId => ({
  type: REQUEST_ALL_DISTRIBUTORS,
  codeId
});

export const receiveDistributors = (json) => ({
  type: RECEIVE_ALL_DISTRIBUTORS,
  distributorsData: json.length > 0 ? transformDistributors.fromAPIModel(json) : [],
});

export const fetchAllDistributors = codeId => dispatch => {
  dispatch(requestDistributors(codeId));
  return fetch('http://gotravelersdiscount.com/distributors')
    .then(response => response.json())
    .then(json => dispatch(receiveDistributors(json)))
}