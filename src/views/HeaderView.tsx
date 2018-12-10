import React, { FunctionComponent } from 'react';
import styles from '../styles/Header.module.css';
import { IUser } from '../types';
import { Auth } from 'aws-amplify';
import Button from '../components/Button';

const HeaderView: FunctionComponent<IUser> = ({ name }) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInitialContainer}>
        {name.substr(0, 1).toUpperCase()}
      </div>
      <p className={styles.userName}>{name}</p>
      <Button className={styles.logOutButton} whenClicked={signOut}>
        Log out
      </Button>
    </header>
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
