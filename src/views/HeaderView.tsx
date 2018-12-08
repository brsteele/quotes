import React, { FunctionComponent } from 'react';
import { IUser } from '../types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';

const HeaderView: FunctionComponent<IUser> = ({ name }) => {
  return (
    <>
      <p>{name}</p>
      <Button whenClicked={signOut}>Log out</Button>
    </>
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
