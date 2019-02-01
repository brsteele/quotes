import React, { FunctionComponent } from 'react';
import styles from '../styles/Header.module.css';
import { promiseToLogOut } from '../restQuotes';
import { IUserState } from '../types';
import Button from '../components/Button';

const HeaderView: FunctionComponent<IUserState> = props => {
  const { name } = props;

  return (
    <header className={styles.header}>
      <div className={styles.userInitialContainer}>
        {name.substr(0, 1).toUpperCase()}
      </div>
      <p className={styles.userName}>{name}</p>
      <Button
        className={styles.logOutButton}
        whenClicked={() => {
          promiseToLogOut().then(() => location.reload());
        }}
      >
        Log out
      </Button>
    </header>
  );
};

export default HeaderView;
