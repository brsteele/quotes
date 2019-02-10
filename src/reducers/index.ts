import { combineReducers } from 'redux';
import userReducer from './userReducer';
import quotesReducer from './quoteReducer';
import userInterfaceReducer from './userInterfaceReducer';

import { IStoreState } from '../types';

const rootReducer = combineReducers<IStoreState>({
  quotes: quotesReducer,
  user: userReducer,
  userInterface: userInterfaceReducer
});

export default rootReducer;
