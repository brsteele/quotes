import { navigate, Router } from '@reach/router';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withAuthenticator } from 'aws-amplify-react';
import HeaderView from './views/HeaderView';
import Spinner from './components/Spinner';
import { IUserState, IQuote, IStoreState } from './types';
import { promiseToGetQuotes } from './restQuotes';
import { updateQuotesLoaded, updateQuotes } from './actions/quotesActions';
import updateUser from './actions/userActions';
import styles from './styles/App.module.css';
import { UserData } from 'amazon-cognito-identity-js';
import QuotesContainerView from './views/QuotesContainerView';

interface IProps {
  authData: UserData;
  updateUserInfo: (user: IUserState) => void;
  updateAllQuotes: (quotes: [IQuote]) => void;
  updateQuotesLoaded: (loading: boolean) => void;
  username: string;
  quotesLoaded: boolean;
  quotes: [IQuote] | null;
}

class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.getQuotes = this.getQuotes.bind(this);
    if (this.props.authData.username) {
      this.props.updateUserInfo({ name: this.props.authData.username });
    }
  }

  public render() {
    const { quotesLoaded, username } = this.props;
    const namePresent = !!(username && username.length);
    if (!quotesLoaded) {
      return <Spinner />;
    } else if (quotesLoaded && namePresent) {
      return (
        <div className={styles.appContainer}>
          <HeaderView name={username} />
          <div className={styles.contentContainer}>
            <QuotesContainerView />
          </div>
        </div>
      );
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.username !== this.props.username) {
      this.getQuotes();
    }
  }

  public getQuotes() {
    const { username } = this.props;
    promiseToGetQuotes(username)
      .then(response => {
        this.props.updateAllQuotes(response);
        this.props.updateQuotesLoaded(true);
        if (!response.length) {
          navigate('/');
        }
      })
      .catch();
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
