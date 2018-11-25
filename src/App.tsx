import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Button from './components/Button';
import HeaderView from './views/HeaderView';
import NewQuote from './views/NewQuote';
import QuoteView from './views/QuoteView';
import { withAuthenticator } from 'aws-amplify-react';
import { API } from 'aws-amplify';

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

export interface IUser {
  name: string;
}

export interface IQuote {
  quote: string;
  by: string;
  tags?: string[];
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
    const updatedQuoteArray = this.state.quotes;
    updatedQuoteArray.push(newQuote);
    this.setState({ loading: true });
    API.post('quotes', '/quotes', {
      body: { ...newQuote, userId: this.props.authData.username }
    })
      .then(data => {
        API.get('quotes', `/quotes/${this.props.authData.username}`, {})
          .then(response => {
            console.log(response);
            this.setState({ quotes: response, loading: false });
          })
          .catch(error => console.log(error));
      })
      .catch(err => console.log(err));
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
      API.get('quotes', `/quotes/${username}`, {})
        .then(data => this.setState({ quotes: data, loading: false }))
        .catch(err => console.log(err));
    }
  }
}

export default withAuthenticator(App);
