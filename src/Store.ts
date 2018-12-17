import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';

const configureStore = () => {
  return createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );
};

export default configureStore;
