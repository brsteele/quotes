import React, { Children, ReactHTMLElement } from 'react';

interface IProps {
  whenClicked: () => void;
}

const Button: React.FunctionComponent<IProps> = ({
  whenClicked,
  children,
  ...rest
}) => {
  return (
    <button {...rest} onClick={whenClicked}>
      {children}
    </button>
  );
};

export default Button;
