import React, { Fragment, useEffect, lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadingUserStart } from './redux/user/user.actions';

import { selectCurrentUser } from './redux/user/user.selectors';

import HeaderContainer from './components/header/header.container';
import Spinner from './components/spinner/spinner.component';
import ErrorBoundry from './components/error-boundry/error-boundry.component';

import './App.scss';

const SignInAndSignUp = lazy(() =>
  import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component')
);

const UserContactsContainer = lazy(() =>
  import('./pages/user-contacts/user-contacts.container')
);

const AddEditContactContainer = lazy(() =>
  import('./pages/add-edit-contact/add-edit-contact.container')
);

const App = ({ loadingUserStart, currentUser }) => {
  useEffect(() => {
    loadingUserStart();
  }, [loadingUserStart]);

  return (
    <Fragment>
      <HeaderContainer />
      <Switch>
        <ErrorBoundry>
          <Suspense fallback={<Spinner />}>
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
          </Suspense>
        </ErrorBoundry>
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
