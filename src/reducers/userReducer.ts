import { IUserState, IUserActions, UserActions } from '../types';

const initState: IUserState = {
  name: ''
};

const userReducer = (
  state: IUserState = initState,
  action: IUserActions | any
): IUserState => {
  switch (action.type) {
    case UserActions.UPDATE_USER:
      return { name: action.payload };
    default:
      return state;
  }
};

export default userReducer;
