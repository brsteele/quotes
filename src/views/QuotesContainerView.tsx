import React from 'react';
import { navigate, Router } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NewQuoteView from './NewQuoteView';
import QuoteView from './QuoteView';
import { IStoreState, IQuote } from '../types';

interface IProps {
  username: string;
  quotes: [IQuote] | null;
  quotesLoaded: boolean;
}

interface IState {
  someState: any;
}

class QuotesContainerView extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    return (
      <>
        <Router>
          <NewQuoteView path="/" default={true} />
          <QuoteView path="quote-view" />
        </Router>{' '}
      </>
    );
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    username: state.user.name,
    quotes: state.quotes.quotesList,
    quotesLoaded: state.quotes.quotesLoaded
  };
};

export default connect(mapStateToProps)(QuotesContainerView);
