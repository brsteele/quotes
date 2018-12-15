import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, ReactHTMLElement } from 'react';
import styles from '../styles/NewQuote.module.css';
import { IQuote } from '../types';
import Button from '../components/Button';

const navigateToQuoteView = () => {
  navigate('quote-view');
};

interface IProps {
  addQuote: (quote: IQuote) => void;
  firstQuote: boolean;
}

export interface INewQuote {
  quote: {
    author: string;
    quote: string;
    tags: string;
  };
}

class NewQuote extends React.Component<
  RouteComponentProps & IProps,
  INewQuote
> {
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
    return (
      <div className={styles.newQuoteContainer}>
        <div className={styles.newQuoteInputContainer}>
          <label>
            {this.props.firstQuote ? 'Add your first quote' : 'Enter a quote'}
          </label>
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
          <Button
            className={styles.addButton}
            whenClicked={this.handleAddQuoteClicked}
          >
            Add it!
          </Button>
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
    this.props.addQuote(quoteToAdd);
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

export default NewQuote;
