import { RouteComponentProps } from '@reach/router';
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { promiseToAddQuote, promiseToGetQuotes } from '../restQuotes';
import { updateQuotes } from '../actions/quotesActions';
import styles from '../styles/NewQuote.module.css';
import { IQuote, IStoreState, IQuotesState } from '../types';
import Button from '../components/Button';

interface IProps {
  quotes: IQuotesState;
  username: string;
  updateQuotes: (quotes: [IQuote]) => any;
}

export interface IState {
  quote: {
    author: string;
    quote: string;
    tags: string;
  };
}

class NewQuote extends React.Component<RouteComponentProps & IProps, IState> {
  public state = {
    quote: {
      author: '',
      quote: '',
      tags: ''
    }
  };
  constructor(props: IProps) {
    super(props);
    this.handleAddQuoteClicked = this.handleAddQuoteClicked.bind(this);
  }
  public render() {
    const firstQuote = this.props.quotes.quotesList
      ? this.props.quotes.quotesList.length < 1
      : true;
    return (
      <div className={styles.newQuoteContainer}>
        <div className={styles.newQuoteInputContainer}>
          <label>{firstQuote ? 'Add your first quote' : 'Enter a quote'}</label>
          <textarea
            rows={6}
            value={this.state.quote.quote}
            onChange={this.handleTextChange}
            name="text"
          />
        </div>
        <div className={styles.newQuoteAuthorContainer}>
          <label>Who said it?</label>
          <input
            type="text"
            value={this.state.quote.author}
            onChange={this.handleTextChange}
            name="author"
          />
        </div>
        <div className={styles.newQuoteTagContainer}>
          <label>
            Tags? <span className="smaller">(comma separated)</span>
          </label>
          <input
            type="text"
            value={this.state.quote.tags}
            onChange={this.handleTextChange}
            name="tags"
          />
        </div>
        <div className={styles.addButtonContainer}>
          <Button whenClicked={this.handleAddQuoteClicked}>Add it!</Button>
        </div>
      </div>
    );
  }
  private handleAddQuoteClicked() {
    const quoteToAdd: IQuote = {
      quote: this.state.quote.quote,
      author: this.state.quote.author,
      quoteId: Date.now().toString()
    };
    if (this.state.quote.tags.trim().length > 0) {
      quoteToAdd.tags = this.state.quote.tags.split(',');
    }
    promiseToAddQuote(quoteToAdd, this.props.username).then(() => {
      promiseToGetQuotes(this.props.username).then(quotes => {
        this.props.updateQuotes(quotes);
      });
    });
    this.setState({ quote: { quote: '', author: '', tags: '' } });
  }

  private handleTextChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputType = evt.target.name;
    switch (inputType) {
      case 'text':
        this.setState({
          quote: { ...this.state.quote, quote: evt.target.value }
        });
        break;
      case 'author':
        this.setState({
          quote: { ...this.state.quote, author: evt.target.value }
        });
        break;
      case 'tags':
        this.setState({
          quote: { ...this.state.quote, tags: evt.target.value }
        });
        break;
      default:
        return;
    }
  };
}

const mapStateToProps = (state: IStoreState) => {
  return {
    quotes: state.quotes,
    username: state.user.name
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateQuotes: (quotes: [IQuote]) => {
      dispatch(updateQuotes(quotes));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewQuote);
