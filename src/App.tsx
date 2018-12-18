import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styles from './styles/App.module.css';
import HeaderView from './views/HeaderView';
import NewQuoteView from './views/NewQuoteView';
import QuoteView from './views/QuoteView';
import { withAuthenticator } from 'aws-amplify-react';
import { getQuotes, addQuote, deleteQuote } from './restQuotes';
import updateUser from './actions/userActions';
import { Auth } from 'aws-amplify';
import { IUserState, IQuote, IStoreState } from './types';

interface IProps {
  authData: any;
  authState: string;
  updateUserInfo: (user: IUserState) => any;
  username: string;
}

interface IState {
  loading: boolean;
  quotes: IQuote[];
  error: boolean;
  user: IUserState;
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
    this.getQuotes = this.getQuotes.bind(this);
    this.deleteQuote = this.deleteQuote.bind(this);
  }

  public render() {
    const name = this.props.username;
    const firstQuote = !this.state.quotes.length ? true : false;
    return (
      <div className={styles.appContainer}>
        <HeaderView
          name={name}
          logoutClicked={() => {
            Auth.signOut()
              .then(data => {
                location.reload();
              })
              .catch(err => console.log(err));
          }}
        />
        <div className={styles.contentContainer}>
          {this.state.loading ? (
            <div>Loading...</div>
          ) : (
            <Router>
              <NewQuoteView
                path="/"
                default={true}
                addQuote={this.addQuote}
                firstQuote={firstQuote}
              />
              <QuoteView
                quotes={this.state.quotes}
                path="quote-view"
                getQuotes={this.getQuotes}
                deleteQuote={this.deleteQuote}
              />
            </Router>
          )}
        </div>
      </div>
    );
  }

  public addQuote(newQuote: IQuote) {
    const username = this.props.authData.username;
    this.setState({ loading: true });
    addQuote(newQuote, username)
      .then(() => {
        this.getQuotes(username);
      })
      .catch();
  }

  public componentDidMount() {
    if (this.props.authData.username) {
      const username = this.props.authData.username;
      this.props.updateUserInfo({ name: username });
      this.getQuotes(username);
    }
  }
  public getQuotes(username: string) {
    this.setState({ loading: true });
    navigate('/');
    getQuotes(username)
      .then(response => {
        this.setState({ quotes: response, loading: false });
        if (response.length) {
          navigate('quote-view');
        } else {
          navigate('/');
        }
      })
      .catch();
  }

  private deleteQuote(quoteToDelete: IQuote) {
    const { quotes } = this.state;
    deleteQuote(quoteToDelete, this.state.user.name)
      .then(res => {
        this.getQuotes(this.state.user.name);
      })
      .catch(err => console.log(err));
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    username: state.user.name
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (user: IUserState) => {
      dispatch(updateUser(user));
    }
  };
};

export default withAuthenticator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
