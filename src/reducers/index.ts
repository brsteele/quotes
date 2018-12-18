import { combineReducers } from 'redux';
import userReducer from './userReducer';
import quotesReducer from './quoteReducer';

import { IStoreState } from '../types';

const rootReducer = combineReducers<IStoreState>({
  quotes: quotesReducer,
  user: userReducer
});

export default rootReducer;
