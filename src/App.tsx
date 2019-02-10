import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { withAuthenticator } from 'aws-amplify-react';
import HeaderView from './views/HeaderView';
import { IUserState } from './types';
import styles from './styles/App.module.css';
import { UserData } from 'amazon-cognito-identity-js';
import QuotesContainerView from './views/QuotesContainerView';
import updateUser from './actions/userActions';

interface IProps {
  authData: UserData;
  updateUser: (user: IUserState) => void;
  error?: boolean;
}

class App extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    try {
      const { username } = this.props.authData;
      return (
        <div className={styles.appContainer}>
          <HeaderView name={username} />
          <div className={styles.contentContainer}>
            <QuotesContainerView />
          </div>
        </div>
      );
    } catch {
      return <div>Whelp, this is embarrassing...something went wrong</div>;
    }
  }
  public componentDidMount() {
    this.props.updateUser({ name: this.props.authData.username });
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateUser: (user: IUserState) => {
      dispatch(updateUser(user));
    }
  };
};

export default withAuthenticator(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
