import React, { FunctionComponent } from 'react';
import { IQuote } from '../types';
import Tags from './Tags';
import Button from './Button';

interface IProps {
  quote: IQuote;
  refreshAction: () => void;
}

const Quote: FunctionComponent<IProps> = ({ quote, refreshAction }) => {
  return (
    <>
      <h1>{quote.quote}</h1>
      <p>{quote.author}</p>
      {quote.tags ? <Tags tags={quote.tags} /> : null}
      <Button whenClicked={refreshAction}>Get new quote</Button>
    </>
  );
};

export default Quote;
