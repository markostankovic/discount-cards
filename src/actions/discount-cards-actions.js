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
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
})

export const fetchCode = codeId => dispatch => {
  dispatch(requestPosts(codeId))
  return fetch(`https://www.reddit.com/r/${codeId}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(codeId, json)))
}