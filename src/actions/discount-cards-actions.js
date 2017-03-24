import transformDiscountCard from '../api-wrapper/transformers/discount-card'
export const REQUEST_CODE = 'REQUEST_CODE';
export const RECEIVE_CODE = 'RECEIVE_CODE';
export const INVALIDATE_CODE = 'INVALIDATE_CODE';

export const requestPosts = codeId => ({
  type: REQUEST_CODE,
  codeId
})

export const receivePosts = (codeId, json) => ({
  type: RECEIVE_CODE,
  codeId,
  cardData: json ? transformDiscountCard.fromAPIModel(json[0]) : null,
  receivedAt: Date.now()
});

export const fetchCode = codeId => dispatch => {
  dispatch(requestPosts(codeId));

  return fetch('http://gotravelersdiscount.com/discount-code/' + codeId)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(codeId, json)))
}