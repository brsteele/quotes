import React, { Children, ReactHTMLElement } from 'react';
import styles from '../styles/Button.module.css';

interface IProps {
  whenClicked: () => void;
  type?: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FunctionComponent<IProps> = ({
  whenClicked,
  children,
  ...rest
}) => {
  const { type } = { ...rest };
  return (
    <button
      {...rest}
      onClick={whenClicked}
      className={`${styles.button} ` + (type ? styles[type] : styles.primary)}
    >
      {children}
    </button>
  );
};

export default Button;
