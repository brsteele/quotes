import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from '../styles/Quote.module.css';
import { IQuote, IStoreState } from '../types';
import { updateQuotes } from '../actions/quotesActions';
import { updateLoading } from '../actions/userInterfaceActions';
import { promiseToGetQuotes, promiseToDeleteQuote } from '../restQuotes';
import Button from '../components/Button';
import Quote from '../components/Quote';

interface IProps {
  quotes: IQuote[] | null;
  quoteIndex: number;
  user: string;
  loading: boolean;
  updateAllQuotes: (quotes: [IQuote]) => any;
  updateLoading: (loading: boolean) => void;
}

class QuoteView extends React.Component<RouteComponentProps & IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
  }
  public render() {
    const { quotes, loading } = this.props;
    if (loading) {
      return null;
    } else if (quotes !== null) {
      return (
        <div className={styles.gridQuoteContainer}>
          {quotes.map((quote, index) => {
            return (
              <Quote
                key={index}
                quote={quote}
                handleDelete={this.handleDeleteClicked}
              />
            );
          })}
        </div>
      );
    } else {
      return (
        <>
          <div>There are no quotes...</div>
          <Button
            whenClicked={() => {
              navigate('new-quote');
            }}
            type="primary"
          >
            Add a quote
          </Button>
        </>
      );
    }
  }

  private handleDeleteClicked(quote: IQuote) {
    this.props.updateLoading(true);
    promiseToDeleteQuote(quote, this.props.user).then(() => {
      promiseToGetQuotes(this.props.user).then(quotes => {
        this.props.updateAllQuotes(quotes);
        this.props.updateLoading(false);
      });
    });
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    quotes: state.quotes.quotesList,
    quoteIndex: state.quotes.activeQuote,
    user: state.user.name,
    loading: state.userInterface.loading
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateAllQuotes: (quotes: [IQuote]) => {
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
)(QuoteView);
