import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';
import {
  loadingContactsSuccess,
  loadingContactsFailure,
  deletingContactsSuccess,
  deletingContactsFailure,
  addContactSuccess,
  addContactFailure,
  updateContactSuccess,
  updateContactFailure,
  importContactsSuccess,
  importContactsFailure,
  exportAllContactsSuccess,
  exportAllContactsFailure
} from './contacts.actions';
import ContactsActionTypes from './contacts.types';

function* loadingContactsAsync() {
  try {
    yield setAuthToken();

    const response = yield call(axios, {
      method: 'get',
      url: 'api/contacts'
    });

    yield put(loadingContactsSuccess(response.data));
  } catch (err) {
    yield put(loadingContactsFailure(err.message));
  }
}

function* deletingContactsAsync({ payload }) {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'delete',
      url: 'api/contacts',
      data: {
        contacts: payload
      }
    });

    yield put(deletingContactsSuccess(response.data));
    // dispatch(loadingContactsStartAsync());
  } catch (err) {
    yield put(deletingContactsFailure(err.message));
  }
}

function* addContactAsync({ payload }) {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'post',
      url: 'api/contacts',
      data: payload
    });

    yield put(addContactSuccess(response.data));
  } catch (err) {
    yield put(addContactFailure(err.message));
  }
}

function* updateContactAsync({ payload }) {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'patch',
      url: `api/contacts/${payload.id}`,
      data: payload
    });

    yield put(updateContactSuccess(response.data));
  } catch (err) {
    yield put(updateContactFailure(err.message));
  }
}

function* importContactsAsync({ payload }) {
  try {
    yield setAuthToken();
    // FormData is more suitable for file uploads
    const fd = new FormData();
    fd.append('csvfile', payload, payload.name);

    const response = yield call(axios.post, 'api/contacts/import-from-csv', fd);

    yield put(importContactsSuccess(response.data));
    // dispatch(loadingContactsStartAsync());
  } catch (err) {
    yield put(importContactsFailure(err.message));
  }
}

function* exportAllContactsAsync() {
  try {
    yield setAuthToken();
    const response = yield call(axios, {
      method: 'get',
      url: 'api/contacts/export/all-to-csv'
    });

    // console.log(response.data);

    yield put(exportAllContactsSuccess());

    // create downloadable file
    const blob = new Blob([response.data], { type: 'text/csv' });

    // create a tag, link it with the file and click it to start downloading the file
    const a = document.createElement('a');
    a.setAttribute('hidden', true);
    a.setAttribute('href', window.URL.createObjectURL(blob));
    a.setAttribute('download', 'contacts.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    yield put(exportAllContactsFailure(err.message));
  }
}

function* loadingContactsStart() {
  yield takeLatest(
    ContactsActionTypes.LOADING_CONTACTS_START,
    loadingContactsAsync
  );
}

function* deletingContactsStart() {
  yield takeLatest(
    ContactsActionTypes.DELETING_CONTACTS_START,
    deletingContactsAsync
  );
}

function* addContactStart() {
  yield takeLatest(ContactsActionTypes.ADD_CONTACT_START, addContactAsync);
}

function* updateContactStart() {
  yield takeLatest(
    ContactsActionTypes.UPDATE_CONTACT_START,
    updateContactAsync
  );
}

function* importContactsStart() {
  yield takeLatest(
    ContactsActionTypes.IMPORT_CONTACTS_START,
    importContactsAsync
  );
}

function* exportAllContactsStart() {
  yield takeLatest(
    ContactsActionTypes.EXPORT_ALL_CONTACTS_START,
    exportAllContactsAsync
  );
}

export default function* contactsSagas() {
  yield all([
    call(loadingContactsStart),
    call(deletingContactsStart),
    call(addContactStart),
    call(updateContactStart),
    call(importContactsStart),
    call(exportAllContactsStart)
  ]);
}
