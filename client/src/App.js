import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingUserStartAsync } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import UserContactsContainer from './pages/user-contacts/user-contacts.container';
import AddEditContactContainer from './pages/add-edit-contact/add-edit-contact.container';
import HeaderContainer from './components/header/header.container';

const App = ({ loadingUserStartAsync, currentUser }) => {
  useEffect(() => {
    loadingUserStartAsync();
  }, [loadingUserStartAsync]);

  return (
    <Fragment>
      <HeaderContainer />
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            currentUser ? <Redirect to='/user-contacts' /> : <SignInAndSignUp />
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
  loadingUserStartAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
