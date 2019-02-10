import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from '../styles/Quote.module.css';
import { IQuote, IStoreState } from '../types';
import { updateQuotes, newQuoteIndex } from '../actions/quotesActions';
import { promiseToGetQuotes, promiseToDeleteQuote } from '../restQuotes';
import Button from '../components/Button';
import Quote from '../components/Quote';

interface IProps {
  quotes: IQuote[] | null;
  quoteIndex: number;
  user: string;
  loading: boolean;
  updateQuoteIndex: (index: number) => any;
  updateAllQuotes: (quotes: [IQuote]) => any;
}

class QuoteView extends React.Component<RouteComponentProps & IProps> {
  constructor(props: IProps) {
    super(props);
    this.getNewQuoteToDisplay = this.getNewQuoteToDisplay.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.randomNumberLessThanOrEqualTo = this.randomNumberLessThanOrEqualTo.bind(
      this
    );
  }
  public render() {
    const { quotes, loading } = this.props;
    if (loading) {
      return null;
    } else if (quotes !== null) {
      return (
        <div className={styles.gridQuoteContainer}>
          {quotes.map((quote, index) => {
            return <Quote key={index} quote={quote} />;
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

  private handleDeleteClicked() {
    if (this.props.quotes) {
      const quoteToDelete = this.props.quotes[this.props.quoteIndex];
      promiseToDeleteQuote(quoteToDelete, this.props.user).then(() => {
        promiseToGetQuotes(this.props.user).then(quotes => {
          this.getNewQuoteToDisplay();
          this.props.updateAllQuotes(quotes);
        });
      });
    }
  }

  private getNewQuoteToDisplay() {
    const { quoteIndex, quotes } = this.props;
    const numberOfQuotes = quotes ? quotes.length : 0;
    if (numberOfQuotes === 1) {
      return;
    } else if (numberOfQuotes === 2) {
      quoteIndex === 1
        ? this.props.updateQuoteIndex(0)
        : this.props.updateQuoteIndex(1);
    } else {
      const nextQuoteIndex = this.randomNumberLessThanOrEqualTo(numberOfQuotes);
      if (nextQuoteIndex === quoteIndex) {
        if (nextQuoteIndex === numberOfQuotes - 1) {
          this.props.updateQuoteIndex(nextQuoteIndex - 1);
        } else {
          this.props.updateQuoteIndex(nextQuoteIndex + 1);
        }
      } else {
        this.props.updateQuoteIndex(nextQuoteIndex);
      }
    }
  }

  private randomNumberLessThanOrEqualTo(a: number) {
    return Math.floor(Math.random() * a);
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
    updateQuoteIndex: (index: number) => {
      dispatch(newQuoteIndex(index));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteView);
