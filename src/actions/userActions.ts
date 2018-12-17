import { IUserState, IUserActions, UserActions } from '../types';

const updateUser = (user: IUserState): IUserActions => {
  return {
    payload: user,
    type: UserActions.UPDATE_USER
  };
};

export default updateUser;
