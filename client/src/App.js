import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingUserStartAsync } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';

import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import UserContacts from './pages/user-contacts/user-contacts.component';
import AddEditContact from './pages/add-edit-contact/add-edit-contact.component';
import Header from './components/header/header.component';

const App = ({ loadingUserStartAsync, currentUser }) => {
  useEffect(() => {
    loadingUserStartAsync();
  }, [loadingUserStartAsync]);

  return (
    <Fragment>
      <Header />
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
            currentUser ? <UserContacts {...props} /> : <Redirect to='/' />
          }
        />
        <Route exact path='/contact' component={AddEditContact} />
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
