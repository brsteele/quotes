import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent } from 'react';
import { IQuote } from '../types';
import Button from '../components/Button';
import Quote from '../components/Quote';

interface IProps {
  quotes: IQuote[];
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
    this.navigateToNewQuote = this.navigateToNewQuote.bind(this);
    this.getNewQuoteToDisplay = this.getNewQuoteToDisplay.bind(this);
  }
  public render() {
    const { quotes, quoteIndex } = this.state;
    const quoteToDisplay = quotes[quoteIndex];
    return (
      <>
        <Quote quote={quoteToDisplay} />
        <Button whenClicked={this.navigateToNewQuote}>Add new quote</Button>
        <Button whenClicked={this.getNewQuoteToDisplay}>Get a new quote</Button>
      </>
    );
  }
  private navigateToNewQuote() {
    navigate('/');
  }
  private getNewQuoteToDisplay() {
    const numberOfQuotes = this.state.quotes.length;
    const { quoteIndex } = this.state;
    if (numberOfQuotes === 1) {
      return;
    } else if (numberOfQuotes === 2) {
      quoteIndex === 1
        ? this.setState({ quoteIndex: 0 })
        : this.setState({ quoteIndex: 1 });
    } else {
      const randomQuote = Math.floor(Math.random() * numberOfQuotes);
      this.setState({ quoteIndex: randomQuote });
    }
  }
}
