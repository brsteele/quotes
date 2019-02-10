import React from 'react';
import { navigate, Router } from '@reach/router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import NewQuoteView from './NewQuoteView';
import QuoteView from './QuoteView';
import Spinner from '../components/Spinner';
import { promiseToGetQuotes } from '../restQuotes';
import { IStoreState, IQuote } from '../types';
import { updateQuotes } from '../actions/quotesActions';
import { updateLoading } from '../actions/userInterfaceActions';

interface IProps {
  username: string;
  quotes: [IQuote] | null;
}

interface IConnectProps {
  updateLoading: (loading: boolean) => void;
  updateQuotes: (quotes: [IQuote]) => void;
  loading: boolean;
}

class QuotesContainerView extends React.Component<IProps & IConnectProps> {
  constructor(props: IProps & IConnectProps) {
    super(props);
  }
  public render() {
    return (
      <>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <Router>
            <QuoteView path="quotes" default={true} />
            <NewQuoteView path="new-quote" />
          </Router>
        )}
      </>
    );
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.username !== this.props.username) {
      this.getQuotes(this.props.username);
    }
  }

  private getQuotes(username: string) {
    this.props.updateLoading(true);
    promiseToGetQuotes(username).then(resp => {
      this.props.updateQuotes(resp);
      this.props.updateLoading(false);
    });
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    username: state.user.name,
    quotes: state.quotes.quotesList,
    loading: state.userInterface.loading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateQuotes: (quotes: [IQuote]) => {
      dispatch(updateQuotes(quotes));
    },
    updateLoading: (loading: boolean) => {
      dispatch(updateLoading(loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuotesContainerView);
