import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, ReactHTMLElement } from 'react';
import { IQuote } from '../App';
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
    by: string;
    text: string;
    tags: string;
  };
}

class NewQuote extends React.Component<
  RouteComponentProps & IProps,
  INewQuote
> {
  public state = {
    quote: {
      by: '',
      text: '',
      tags: ''
    }
  };
  constructor(props: IProps) {
    super(props);
    this.handleQuoteTextChange = this.handleQuoteTextChange.bind(this);
    this.handleByTextChange = this.handleByTextChange.bind(this);
    this.handleTagTextChange = this.handleTagTextChange.bind(this);
    this.handleAddQuoteClicked = this.handleAddQuoteClicked.bind(this);
  }
  public render() {
    return (
      <>
        {this.props.firstQuote ? <h1>Add your first quote</h1> : null}
        <input
          type="text"
          value={this.state.quote.text}
          onChange={this.handleQuoteTextChange}
        />
        <input
          type="text"
          value={this.state.quote.by}
          onChange={this.handleByTextChange}
        />
        <input
          type="text"
          value={this.state.quote.tags}
          onChange={this.handleTagTextChange}
        />
        <Button whenClicked={this.handleAddQuoteClicked}>Add Quote</Button>
        <Button whenClicked={navigateToQuoteView}>Quote View</Button>
      </>
    );
  }
  private handleAddQuoteClicked() {
    const quoteToAdd: IQuote = {
      text: this.state.quote.text,
      by: this.state.quote.by
    };
    if (this.state.quote.tags.trim().length > 0) {
      quoteToAdd.tags = this.state.quote.tags.split(',');
    }
    this.props.addQuote(quoteToAdd);
    this.setState({ quote: { text: '', by: '', tags: '' } });
  }
  private handleQuoteTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      quote: {
        ...this.state.quote,
        text: evt.currentTarget.value
      }
    });
  }
  private handleByTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      quote: {
        ...this.state.quote,
        by: evt.currentTarget.value
      }
    });
  }
  private handleTagTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      quote: {
        ...this.state.quote,
        tags: evt.currentTarget.value
      }
    });
  }
}

export default NewQuote;
