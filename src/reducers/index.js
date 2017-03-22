import { combineReducers } from 'redux'
import { postsByReddit, selectedReddit } from './reddit-reducer';
import { discountCards } from './discount-code-reducer';

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  discountCards
})

export default rootReducer