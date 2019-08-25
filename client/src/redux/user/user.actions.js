import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import UserActionTypes from './user.types';

const loadingUserStart = () => ({
  type: UserActionTypes.LOADING_USER_START
});

const loadingUserSuccess = user => ({
  type: UserActionTypes.LOADING_USER_SUCCESS,
  payload: user
});

const loadingUserFailure = errorMessage => ({
  type: UserActionTypes.LOADING_USER_FAILURE,
  payload: errorMessage
});

export const loadingUserStartAsync = () => async dispatch => {
  setAuthToken();
  dispatch(loadingUserStart());

  try {
    const response = await axios({
      method: 'get',
      url: '/api/users/auth'
    });

    const { name, email, _id, joindate } = response.data;
    const user = { name, email, joindate, id: _id };

    dispatch(loadingUserSuccess(user));
  } catch (err) {
    dispatch(loadingUserFailure(err.message));
  }
};

const registerUserStart = () => ({
  type: UserActionTypes.REGISTER_USER_START
});

const registerUserSuccess = user => ({
  type: UserActionTypes.REGISTER_USER_SUCCESS,
  payload: user
});

const registerUserFailure = errorMessage => ({
  type: UserActionTypes.REGISTER_USER_FAILURE,
  payload: errorMessage
});

export const registerUserStartAsync = userCredentials => async dispatch => {
  dispatch(registerUserStart());

  try {
    const response = await axios({
      method: 'post',
      url: 'api/users/register',
      data: { ...userCredentials }
    });

    const { name, email, _id, joindate } = response.data.user;
    const user = { name, email, joindate, id: _id };

    localStorage.setItem('token', response.data.token);
    dispatch(registerUserSuccess(user));
  } catch (err) {
    registerUserFailure(err.message);
  }
};

const signinUserStart = () => ({
  type: UserActionTypes.SIGNIN_USER_START
});

const signinUserSuccess = user => ({
  type: UserActionTypes.SIGNIN_USER_SUCCESS,
  payload: user
});

const signinUserFailure = errorMessage => ({
  type: UserActionTypes.SIGNIN_USER_FAILURE,
  payload: errorMessage
});

export const signinUserStartAsync = userCredentials => async dispatch => {
  dispatch(signinUserStart());

  try {
    const response = await axios({
      method: 'post',
      url: 'api/users/login',
      data: { ...userCredentials }
    });

    const { name, email, _id, joindate } = response.data.user;
    const user = { name, email, joindate, id: _id };

    localStorage.setItem('token', response.data.token);
    dispatch(signinUserSuccess(user));
  } catch (err) {
    signinUserFailure(err.message);
  }
};

const signoutUserStart = () => ({
  type: UserActionTypes.SIGNOUT_USER_START
});

const signoutUserSuccess = () => ({
  type: UserActionTypes.SIGNOUT_USER_SUCCESS
});

const signoutUserFailure = errorMessage => ({
  type: UserActionTypes.SIGNOUT_USER_FAILURE,
  payload: errorMessage
});

export const signoutUserStartAsync = () => async dispatch => {
  setAuthToken();
  dispatch(signoutUserStart());

  try {
    await axios({
      method: 'post',
      url: 'api/users/logout'
    });

    localStorage.removeItem('token');
    dispatch(signoutUserSuccess());
  } catch (err) {
    signoutUserFailure(err.message);
  }
};
