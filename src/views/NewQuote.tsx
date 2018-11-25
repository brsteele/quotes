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
      by: '',
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
        {this.props.firstQuote ? <h1>Add your first quote</h1> : null}
        <input
          type="text"
          value={this.state.quote.quote}
          onChange={this.handleTextChange}
          name="text"
        />
        <input
          type="text"
          value={this.state.quote.by}
          onChange={this.handleTextChange}
          name="by"
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
      by: this.state.quote.by
    };
    if (this.state.quote.tags.trim().length > 0) {
      quoteToAdd.tags = this.state.quote.tags.split(',');
    }
    this.props.addQuote(quoteToAdd);
    this.setState({ quote: { quote: '', by: '', tags: '' } });
  }

  private handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const inputType = evt.target.name;
    switch (inputType) {
      case 'text':
        this.setState({
          quote: { ...this.state.quote, quote: evt.currentTarget.value }
        });
        break;
      case 'by':
        this.setState({
          quote: { ...this.state.quote, by: evt.currentTarget.value }
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
