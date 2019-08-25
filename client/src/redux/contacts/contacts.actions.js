import axios from 'axios';

import setAuthToken from '../utils/setAuthToken';

import ContactsActionTypes from './contacts.types';

const loadingContactsStart = () => ({
  type: ContactsActionTypes.LOADING_CONTACTS_START
});

const loadingContactsSuccess = contacts => ({
  type: ContactsActionTypes.LOADING_CONTACTS_SUCCESS,
  payload: contacts
});

const loadingContactsFailure = errorMessage => ({
  type: ContactsActionTypes.LOADING_CONTACTS_FAILURE,
  payload: errorMessage
});

export const loadingContactsStartAsync = () => async dispatch => {
  setAuthToken();
  dispatch(loadingContactsStart());

  try {
    const response = await axios({
      method: 'get',
      url: 'api/contacts'
    });

    dispatch(loadingContactsSuccess(response.data));
  } catch (err) {
    dispatch(loadingContactsFailure(err.message));
  }
};

const deletingContactsStart = () => ({
  type: ContactsActionTypes.DELETING_CONTACTS_START
});

const deletingContactsSuccess = () => ({
  type: ContactsActionTypes.DELETING_CONTACTS_SUCCESS
});

const deletingContactsFailure = errorMessage => ({
  type: ContactsActionTypes.DELETING_CONTACTS_FAILURE,
  payload: errorMessage
});

export const deletingContactsStartAsync = ids => async dispatch => {
  setAuthToken();
  dispatch(deletingContactsStart());

  try {
    const response = await axios({
      method: 'delete',
      url: 'api/contacts',
      data: {
        contacts: ids
      }
    });

    dispatch(deletingContactsSuccess(response.data));
    dispatch(loadingContactsStartAsync());
  } catch (err) {
    dispatch(deletingContactsFailure(err.message));
  }
};

export const addSelectedContact = contact => ({
  type: ContactsActionTypes.ADD_SELECTED_CONTACT,
  payload: contact
});

export const removeSelectedContact = contact => ({
  type: ContactsActionTypes.REMOVE_SELECTED_CONTACT,
  payload: contact
});

export const unselectContactsByIds = contacts => ({
  type: ContactsActionTypes.UNSELECT_CONTACTS_BY_IDS,
  payload: contacts
});

export const selectAllContacts = () => ({
  type: ContactsActionTypes.SELECT_ALL_CONTACTS
});

export const unselectAllContacts = () => ({
  type: ContactsActionTypes.UNSELECT_ALL_CONTACTS
});

export const addContactToEdit = contact => ({
  type: ContactsActionTypes.ADD_CONTACT_TO_EDIT,
  payload: contact
});

const addContactStart = () => ({
  type: ContactsActionTypes.ADD_CONTACT_START
});

const addContactSuccess = () => ({
  type: ContactsActionTypes.ADD_CONTACT_SUCCESS
});

const addContactFailure = errorMessage => ({
  type: ContactsActionTypes.ADD_CONTACT_FAILURE,
  payload: errorMessage
});

export const addContactStartAsync = contact => async dispatch => {
  setAuthToken();
  dispatch(addContactStart());

  try {
    const response = await axios({
      method: 'post',
      url: 'api/contacts',
      data: contact
    });

    dispatch(addContactSuccess(response.data));
  } catch (err) {
    dispatch(addContactFailure(err.message));
  }
};

const updateContactStart = () => ({
  type: ContactsActionTypes.UPDATE_CONTACT_START
});

const updateContactSuccess = () => ({
  type: ContactsActionTypes.UPDATE_CONTACT_SUCCESS
});

const updateContactFailure = errorMessage => ({
  type: ContactsActionTypes.UPDATE_CONTACT_FAILURE,
  payload: errorMessage
});

export const updateContactStartAsync = contact => async dispatch => {
  setAuthToken();
  dispatch(updateContactStart());

  try {
    const response = await axios({
      method: 'patch',
      url: `api/contacts/${contact.id}`,
      data: contact
    });

    dispatch(updateContactSuccess(response.data));
  } catch (err) {
    dispatch(updateContactFailure(err.message));
  }
};

const importContactsStart = () => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_START
});

const importContactsSuccess = () => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_SUCCESS
});

const importContactsFailure = errorMessage => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_FAILURE,
  payload: errorMessage
});

export const importContactsStartAsync = fileObject => async dispatch => {
  setAuthToken();
  dispatch(importContactsStart());

  try {
    // FormData is more suitable for file uploads
    const fd = new FormData();
    fd.append('csvfile', fileObject, fileObject.name);

    const response = await axios.post('api/contacts/import-from-csv', fd);

    await dispatch(importContactsSuccess(response.data));
    dispatch(loadingContactsStartAsync());
  } catch (err) {
    dispatch(importContactsFailure(err.message));
  }
};

const exportAllContactsStart = () => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_START
});

const exportAllContactsSuccess = () => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_SUCCESS
});

const exportAllContactsFailure = errorMessage => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_FAILURE,
  payload: errorMessage
});

export const exportAllContactsStartAsync = () => async dispatch => {
  setAuthToken();
  dispatch(exportAllContactsStart());

  try {
    const response = await axios({
      method: 'get',
      url: 'api/contacts/export/all-to-csv'
    });

    dispatch(exportAllContactsSuccess());
    return response;
  } catch (err) {
    dispatch(exportAllContactsFailure(err.message));
  }
};
