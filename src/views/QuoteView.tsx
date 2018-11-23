import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import Button from '../components/Button';

const navigateToNewQuote = () => navigate('/');

interface IProps {
  quotes: string[];
}

const QuoteView: FunctionComponent<RouteComponentProps & IProps> = ({
  quotes
}) => {
  const quoteToDisplay = quotes[0];

  return (
    <>
      <h1>{quoteToDisplay ? quoteToDisplay : 'No quotes'}</h1>
      <Button whenClicked={navigateToNewQuote}>Add new quote</Button>
    </>
  );
};

export default QuoteView;
