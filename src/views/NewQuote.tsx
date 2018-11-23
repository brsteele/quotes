import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, ReactHTMLElement } from 'react';
import Button from '../components/Button';

const navigateToQuoteView = () => {
  navigate('quote-view');
};

interface IProps {
  addQuote: (quote: any) => void;
}

class NewQuote extends React.Component<RouteComponentProps & IProps, {}> {
  public state = {
    quote: {
      by: '',
      text: ''
    }
  };
  constructor(props: IProps) {
    super(props);
    this.handleQuoteTextChange = this.handleQuoteTextChange.bind(this);
    this.handleByTextChange = this.handleByTextChange.bind(this);
    this.handleAddQuoteClicked = this.handleAddQuoteClicked.bind(this);
  }
  public render() {
    return (
      <>
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
        <Button whenClicked={this.handleAddQuoteClicked}>Add Quote</Button>
        <Button whenClicked={navigateToQuoteView}>Quote View</Button>
      </>
    );
  }
  private handleAddQuoteClicked() {
    this.props.addQuote(this.state.quote);
    this.setState({ quote: { text: '', by: '' } });
  }
  private handleQuoteTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      quote: {
        by: this.state.quote.by,
        text: evt.currentTarget.value
      }
    });
  }
  private handleByTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      quote: {
        by: evt.currentTarget.value,
        text: this.state.quote.text
      }
    });
  }
}

export default NewQuote;
