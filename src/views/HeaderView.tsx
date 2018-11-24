import React, { FunctionComponent } from 'react';
import { IUser } from '../App';

const HeaderView: FunctionComponent<IUser> = ({ name, loggedIn }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default HeaderView;
