import React, { FunctionComponent } from 'react';
import { IQuote } from '../types';
import Tags from './Tags';

interface IProps {
  quote: IQuote;
}

const Quote: FunctionComponent<IProps> = ({ quote }) => {
  return (
    <>
      <h1>{quote.quote}</h1>
      <p>{quote.by}</p>
      {quote.tags ? <Tags tags={quote.tags} /> : null}
    </>
  );
};

export default Quote;
