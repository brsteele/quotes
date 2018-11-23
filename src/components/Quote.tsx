import React, { FunctionComponent } from 'react';
import { IQuote } from '../App';

interface IProps {
  quote: IQuote;
}

const Quote: FunctionComponent<IProps> = ({ quote }) => {
  return (
    <>
      <h1>{quote.text}</h1>
      <p>{quote.by}</p>
    </>
  );
};

export default Quote;
