import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { IQuote } from '../App';
import Button from '../components/Button';
import Quote from '../components/Quote';

const navigateToNewQuote = () => navigate('/');

interface IProps {
  quotes: IQuote[];
}

const QuoteView: FunctionComponent<RouteComponentProps & IProps> = ({
  quotes
}) => {
  const quoteToDisplay = quotes[0];
  // Is there ever a scenario where this is no quote to display?
  return (
    <>
      {quoteToDisplay ? <Quote quote={quoteToDisplay} /> : <h1>No Quotes</h1>}
      <Button whenClicked={navigateToNewQuote}>Add new quote</Button>
    </>
  );
};

export default QuoteView;
