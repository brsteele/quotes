import { UserInterfaceActionTypes, IUserInterfaceActions } from '../types';

export const updateLoading = (loading: boolean): IUserInterfaceActions => {
  if (loading) {
    return {
      type: UserInterfaceActionTypes.LOADING
    };
  } else {
    return {
      type: UserInterfaceActionTypes.LOADED
    };
  }
};
