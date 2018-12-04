import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { IQuote } from '../types';
import Button from '../components/Button';
import Quote from '../components/Quote';

interface IProps {
  quotes: IQuote[];
  getQuotes: (username: string) => void;
  deleteQuote: (quote: IQuote) => void;
  username: string;
}

interface IState {
  quotes: IQuote[];
  quoteIndex: number;
}

export default class QuoteView extends React.Component<
  RouteComponentProps & IProps,
  IState
> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      quotes: this.props.quotes,
      quoteIndex: 0
    };
    this.getNewQuoteToDisplay = this.getNewQuoteToDisplay.bind(this);
  }
  public render() {
    const { quotes, quoteIndex } = this.state;
    const quoteToDisplay = quotes[quoteIndex];
    const deleteQuote = () => this.props.deleteQuote(quoteToDisplay);
    const navigateToNewQuote = () => navigate('/');
    return (
      <>
        <Quote
          quote={quoteToDisplay}
          refreshAction={this.getNewQuoteToDisplay}
        />
        <Button whenClicked={navigateToNewQuote}>Add new quote</Button>
        <Button whenClicked={deleteQuote}>Delete quote</Button>
      </>
    );
  }

  private getNewQuoteToDisplay() {
    const { quoteIndex, quotes } = this.state;
    const numberOfQuotes = quotes.length;
    if (numberOfQuotes === 1) {
      return;
    } else if (numberOfQuotes === 2) {
      quoteIndex === 1
        ? this.setState({ quoteIndex: 0 })
        : this.setState({ quoteIndex: 1 });
    } else {
      const randomQuoteIndex = Math.floor(Math.random() * numberOfQuotes);
      if (randomQuoteIndex === quoteIndex) {
        if (randomQuoteIndex === numberOfQuotes - 1) {
          this.setState({ quoteIndex: randomQuoteIndex - 1 });
        } else {
          this.setState({ quoteIndex: randomQuoteIndex + 1 });
        }
      } else {
        this.setState({ quoteIndex: randomQuoteIndex });
      }
    }
  }
}
