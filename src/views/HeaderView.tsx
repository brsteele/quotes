import React, { FunctionComponent } from 'react';
import { IUser } from '../App';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';

const HeaderView: FunctionComponent<IUser> = ({ name }) => {
  return (
    <div>
      <p>{name}</p>
      <Button whenClicked={signOut}>Log out</Button>
    </div>
  );
};

const signOut = () => {
  Auth.signOut()
    .then(data => {
      location.reload();
    })
    .catch(err => console.log(err));
};

export default HeaderView;
