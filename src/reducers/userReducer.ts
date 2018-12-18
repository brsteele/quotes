import { IUserState, IUserActions, UserActions } from '../types';

const initState: IUserState = {
  name: ''
};

const userReducer = (
  state: IUserState = initState,
  action: IUserActions
): IUserState => {
  switch (action.type) {
    case UserActions.UPDATE_USER:
      return { name: action.payload.name };
    default:
      return state;
  }
};

export default userReducer;
