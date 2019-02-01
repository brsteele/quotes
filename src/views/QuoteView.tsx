import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styles from '../styles/Quote.module.css';
import { IQuote, IStoreState } from '../types';
import {
  updateQuotes,
  newQuoteIndex,
  updateQuotesLoaded
} from '../actions/quotesActions';
import { promiseToGetQuotes, promiseToDeleteQuote } from '../restQuotes';
import Button from '../components/Button';
import Quote from '../components/Quote';

interface IProps {
  quotes: IQuote[] | null;
  quoteIndex: number;
  quotesLoaded: boolean;
  user: string;
  updateQuoteIndex: (index: number) => any;
  updateAllQuotes: (quotes: [IQuote]) => any;
  updateQuotesLoaded: (loading: boolean) => any;
}

class QuoteView extends React.Component<RouteComponentProps & IProps> {
  constructor(props: IProps) {
    super(props);
    this.getNewQuoteToDisplay = this.getNewQuoteToDisplay.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
  }
  public render() {
    const { quotes, quoteIndex, quotesLoaded } = this.props;
    if (!quotesLoaded) {
      return <div>Loading quotes...</div>;
    } else if (quotes !== null) {
      const quoteToDisplay = quotes[quoteIndex];
      return (
        <div className={styles.quoteContainer}>
          <Quote quote={quoteToDisplay} />
          <div className={styles.buttonContainer}>
            <Button
              whenClicked={this.getNewQuoteToDisplay}
              className={styles.actionButton}
            >
              Get new quote
            </Button>
            <Button
              whenClicked={() => navigate('/')}
              className={styles.actionButton}
            >
              Add new quote
            </Button>
            <Button
              whenClicked={this.handleDeleteClicked}
              className={styles.actionButton}
            >
              Delete quote
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div>There are no quotes...</div>
          <Button
            whenClicked={() => {
              navigate('/');
            }}
            className={styles.actionButton}
          />
        </>
      );
    }
  }

  public componentDidMount() {
    this.props.updateQuotesLoaded(true);
    promiseToGetQuotes(this.props.user).then(quotes => {
      quotes.length ? this.props.updateAllQuotes(quotes) : navigate('/');
    });
  }

  private handleDeleteClicked() {
    if (this.props.quotes) {
      const quoteToDelete = this.props.quotes[this.props.quoteIndex];
      this.props.updateQuotesLoaded(false);
      promiseToDeleteQuote(quoteToDelete, this.props.user).then(() => {
        promiseToGetQuotes(this.props.user).then(quotes => {
          this.getNewQuoteToDisplay();
          this.props.updateAllQuotes(quotes);
          this.props.updateQuotesLoaded(true);
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
      const randomQuoteIndex = Math.floor(Math.random() * numberOfQuotes);
      if (randomQuoteIndex === quoteIndex) {
        if (randomQuoteIndex === numberOfQuotes - 1) {
          this.props.updateQuoteIndex(randomQuoteIndex - 1);
        } else {
          this.props.updateQuoteIndex(randomQuoteIndex + 1);
        }
      } else {
        this.props.updateQuoteIndex(randomQuoteIndex);
      }
    }
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    quotes: state.quotes.quotesList,
    quoteIndex: state.quotes.activeQuote,
    quotesLoaded: state.quotes.quotesLoaded,
    user: state.user.name
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateAllQuotes: (quotes: [IQuote]) => {
      dispatch(updateQuotes(quotes));
    },
    updateQuoteIndex: (index: number) => {
      dispatch(newQuoteIndex(index));
    },
    updateQuotesLoaded: (loading: boolean) => {
      dispatch(updateQuotesLoaded(loading));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteView);
