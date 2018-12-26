import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import HeaderView from './views/HeaderView';
import NewQuoteView from './views/NewQuoteView';
import QuoteView from './views/QuoteView';
import { IUserState, IQuote, IStoreState } from './types';
import { getQuotes, addQuote, deleteQuote } from './restQuotes';
import { updateQuotesLoaded, updateQuotes } from './actions/quotesActions';
import updateUser from './actions/userActions';
import styles from './styles/App.module.css';

interface IProps {
  authData: any;
  updateUserInfo: (user: IUserState) => any;
  updateAllQuotes: (quotes: [IQuote]) => any;
  updateQuotesLoaded: (loading: boolean) => any;
  username: string;
  quotesLoaded: boolean;
  quotes: [IQuote] | null;
}

class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.addQuote = this.addQuote.bind(this);
    this.getQuotes = this.getQuotes.bind(this);
    this.deleteQuote = this.deleteQuote.bind(this);
    if (this.props.authData.username) {
      const username = this.props.authData.username;
      this.props.updateUserInfo({ name: username });
    }
  }

  public render() {
    const { quotesLoaded, username } = this.props;
    const namePresent = this.props.username.length;
    if (!quotesLoaded) {
      return <div>Loading the app...</div>;
    } else if (quotesLoaded && namePresent) {
      return (
        <div className={styles.appContainer}>
          <HeaderView
            name={username}
            logoutClicked={() => {
              Auth.signOut()
                .then(data => {
                  location.reload();
                })
                .catch(err => console.log(err));
            }}
          />
          <div className={styles.contentContainer}>
            <Router>
              <NewQuoteView path="/" default={true} />
              <QuoteView path="quote-view" />
            </Router>
          </div>
        </div>
      );
    }
  }

  public addQuote(newQuote: IQuote) {
    const username = this.props.username;
    addQuote(newQuote, username)
      .then(() => {
        this.getQuotes();
      })
      .catch();
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.username !== this.props.username) {
      this.getQuotes();
    }
  }

  public getQuotes() {
    const { username } = this.props;
    getQuotes(username)
      .then(response => {
        this.props.updateAllQuotes(response);
        this.props.updateQuotesLoaded(true);
        if (!response.length) {
          navigate('/');
        }
      })
      .catch();
  }

  private deleteQuote(quoteToDelete: IQuote) {
    const { username } = this.props;
    deleteQuote(quoteToDelete, username)
      .then(res => {
        this.getQuotes();
      })
      .catch(err => console.log(err));
  }
}

const mapStateToProps = (state: IStoreState) => {
  return {
    username: state.user.name,
    quotes: state.quotes.quotesList,
    quotesLoaded: state.quotes.quotesLoaded
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUserInfo: (user: IUserState) => {
      dispatch(updateUser(user));
    },
    updateAllQuotes: (quotes: [IQuote]) => {
      dispatch(updateQuotes(quotes));
    },
    updateQuotesLoaded: (loaded: boolean) => {
      dispatch(updateQuotesLoaded(loaded));
    }
  };
};

export default withAuthenticator(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
