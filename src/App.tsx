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
  error: boolean;
  user: IUser;
}

export interface IUser {
  name: string;
  loggedIn: boolean;
}

export interface IQuote {
  text: string;
  by: string;
  tags?: string[];
}

const someQuote: IQuote = {
  by: 'Steve Jobs',
  text: "Here's to the crazy ones",
  tags: ['tech', 'apple']
};

class App extends Component<{}, IState> {
  public state = {
    error: false,
    loading: true,
    quotes: [someQuote],
    user: {
      loggedIn: true,
      name: 'Brian Steele'
    }
  };
  constructor(props: {}) {
    super(props);
    this.addQuote = this.addQuote.bind(this);
  }

  public render() {
    const firstQuote = !this.state.quotes.length ? true : false;
    return (
      <div className="App">
        <header className="App-header">
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <Router>
              <NewQuote
                path="/"
                default={true}
                addQuote={this.addQuote}
                firstQuote={firstQuote}
              />
              <QuoteView quotes={this.state.quotes} path="quote-view" />
            </Router>
          )}
        </header>
      </div>
    );
  }

  public addQuote(newQuote: IQuote) {
    const updatedQuoteArray = this.state.quotes;
    updatedQuoteArray.push(newQuote);
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
