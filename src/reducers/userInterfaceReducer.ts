import {
  UserInterfaceActionTypes,
  IUserInterfaceActions,
  IUserInterfaceState
} from '../types';

const initialState = {
  loading: true
};

const userInterfaceReducer = (
  state: IUserInterfaceState = initialState,
  action: IUserInterfaceActions
): IUserInterfaceState => {
  if (action.type === 'LOADING') {
    return { loading: true };
  } else if (action.type === 'LOADED') {
    return { loading: false };
  } else {
    return state;
  }
};

export default userInterfaceReducer;
