import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import './App.css';
import Button from './components/Button';
import logo from './logo.svg';
import NewQuote from './views/NewQuote';
import QuoteView from './views/QuoteView';

interface IState {
  loading: boolean;
  quotes: IQuote[];
}

export interface IQuote {
  quote: string;
  by: string;
}

const someQuote: IQuote = {
  by: 'Steve Jobs',
  quote: "Here's to the crazy ones"
};

class App extends Component<{}, IState> {
  public state = {
    loading: true,
    quotes: [someQuote]
  };
  constructor(props: {}) {
    super(props);
    this.addQuote = this.addQuote.bind(this);
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <Router>
              <NewQuote path="/" default={true} addQuote={this.addQuote} />
              <QuoteView quotes={this.state.quotes} path="quote-view" />
            </Router>
          )}
        </header>
      </div>
    );
  }

  public addQuote(quote: string) {
    const updatedQuoteArray = this.state.quotes;
    updatedQuoteArray.push({ quote, by: 'Some dude' });
    this.setState({ quotes: updatedQuoteArray });
  }

  public componentDidMount() {
    // we'll do a call to get the logged in users quotes here. Depenging on the response, we'll do some navigation For now, let's pretend...
    setTimeout(() => {
      this.setState({ loading: false }, () => {
        if (this.state.quotes.length) {
          navigate('quote-view');
        } else {
          navigate('/');
        }
      });
    }, 2000);
  }
}

export default App;
