import { combineReducers } from 'redux'
import { postsByReddit, selectedReddit } from './reddit-reducer';
import { discountCards } from './discount-code-reducer';
import { distributors } from './distributors-reducer';
import { locations } from './locations-reducer';

const rootReducer = combineReducers({
  postsByReddit,
  selectedReddit,
  discountCards,
  distributors,
  locations
})

export default rootReducer