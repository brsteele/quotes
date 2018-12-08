import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, ReactHTMLElement } from 'react';
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
      <>
        {this.props.firstQuote ? <h1>Add your first quote!</h1> : null}
        <textarea
          rows={6}
          value={this.state.quote.quote}
          onChange={this.handleTextChange}
          name="text"
        />
        <input
          type="text"
          value={this.state.quote.author}
          onChange={this.handleTextChange}
          name="author"
        />
        <input
          type="text"
          value={this.state.quote.tags}
          onChange={this.handleTextChange}
          name="tags"
        />
        <Button whenClicked={this.handleAddQuoteClicked}>Add Quote</Button>
        <Button whenClicked={navigateToQuoteView}>Quote View</Button>
      </>
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
          quote: { ...this.state.quote, quote: evt.currentTarget.value }
        });
        break;
      case 'author':
        this.setState({
          quote: { ...this.state.quote, author: evt.currentTarget.value }
        });
        break;
      case 'tags':
        this.setState({
          quote: { ...this.state.quote, tags: evt.currentTarget.value }
        });
        break;
      default:
        return;
    }
  };
}

export default NewQuote;
