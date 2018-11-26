import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Button from './components/Button';
import HeaderView from './views/HeaderView';
import NewQuote from './views/NewQuote';
import QuoteView from './views/QuoteView';
import { withAuthenticator } from 'aws-amplify-react';
import { getQuotes, addQuote } from './restQuotes';
import { IUser, IQuote } from './types';

interface IProps {
  authData: any;
  authState: string;
}

interface IState {
  loading: boolean;
  quotes: IQuote[];
  error: boolean;
  user: IUser;
}

class App extends Component<IProps, IState> {
  public state = {
    error: false,
    loading: true,
    quotes: new Array(),
    user: {
      name: ''
    }
  };
  constructor(props: IProps) {
    super(props);
    this.addQuote = this.addQuote.bind(this);
  }

  public render() {
    const { name } = this.state.user;
    const firstQuote = !this.state.quotes.length ? true : false;
    return (
      <div className="App">
        <header className="App-header">
          <HeaderView name={name} />
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
    const username = this.props.authData.username;
    this.setState({ loading: true });
    addQuote(newQuote, username)
      .then(() => {
        getQuotes(username)
          .then(quotes => {
            this.setState({ quotes, loading: false });
            navigate('quote-view');
          })
          .catch();
      })
      .catch();
  }

  public componentDidMount() {
    // we'll do a call to get the logged in users quotes here. Depenging on the response, we'll do some navigation For now, let's pretend...
    if (this.props.authData.username) {
      const username = this.props.authData.username;
      this.setState({
        user: {
          name: username
        }
      });
      getQuotes(username)
        .then(response => {
          this.setState({ quotes: response, loading: false });
          if (response.length) {
            navigate('quote-view');
          }
        })
        .catch();
    }
  }
}

export default withAuthenticator(App);
