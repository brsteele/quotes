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
      {quote.tags
        ? quote.tags.map((item, index) => {
            return <p key={index}>{item}</p>;
          })
        : null}
    </>
  );
};

export default Quote;
