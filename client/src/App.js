import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingUserStart } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import UserContactsContainer from './pages/user-contacts/user-contacts.container';
import AddEditContactContainer from './pages/add-edit-contact/add-edit-contact.container';
import HeaderContainer from './components/header/header.container';

import './App.scss';

const App = ({ loadingUserStart, currentUser }) => {
  useEffect(() => {
    loadingUserStart();
  }, [loadingUserStart]);

  return (
    <Fragment>
      <HeaderContainer />
      <Switch>
        <Route
          exact
          path='/'
          render={props =>
            currentUser ? (
              <Redirect to='/user-contacts' />
            ) : (
              <SignInAndSignUp {...props} />
            )
          }
        />
        <Route
          exact
          path='/user-contacts'
          render={props =>
            // if you didn't pass the props to the component > it will never has {history, match, location}
            currentUser ? (
              <UserContactsContainer {...props} />
            ) : (
              <Redirect to='/' />
            )
          }
        />
        <Route exact path='/contact' component={AddEditContactContainer} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = {
  loadingUserStart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
