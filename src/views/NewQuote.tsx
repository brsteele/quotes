import { navigate, RouteComponentProps } from '@reach/router';
import React, { FunctionComponent, ReactHTMLElement } from 'react';
import Button from '../components/Button';

const navigateToQuoteView = () => {
  navigate('quote-view');
};

interface IProps {
  addQuote: (quote: string) => void;
}

class NewQuote extends React.Component<RouteComponentProps & IProps, {}> {
  public state = { newQuoteText: '' };
  constructor(props: IProps) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleAddQuoteClicked = this.handleAddQuoteClicked.bind(this);
  }
  public render() {
    return (
      <>
        <input
          type="text"
          value={this.state.newQuoteText}
          onChange={this.handleTextChange}
        />
        <Button whenClicked={this.handleAddQuoteClicked}>Add Quote</Button>
        <Button whenClicked={navigateToQuoteView}>Quote View</Button>
      </>
    );
  }
  private handleAddQuoteClicked() {
    this.props.addQuote(this.state.newQuoteText);
    this.setState({ newQuoteText: '' });
  }
  private handleTextChange(evt: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ newQuoteText: evt.currentTarget.value });
  }
}

export default NewQuote;
