import ContactsActionTypes from './contacts.types';

export const loadingContactsStart = () => ({
  type: ContactsActionTypes.LOADING_CONTACTS_START
});

export const loadingContactsSuccess = contacts => ({
  type: ContactsActionTypes.LOADING_CONTACTS_SUCCESS,
  payload: contacts
});

export const loadingContactsFailure = errorMessage => ({
  type: ContactsActionTypes.LOADING_CONTACTS_FAILURE,
  payload: errorMessage
});

export const deletingContactsStart = ids => ({
  type: ContactsActionTypes.DELETING_CONTACTS_START,
  payload: ids
});

export const deletingContactsSuccess = () => ({
  type: ContactsActionTypes.DELETING_CONTACTS_SUCCESS
});

export const deletingContactsFailure = errorMessage => ({
  type: ContactsActionTypes.DELETING_CONTACTS_FAILURE,
  payload: errorMessage
});

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

export const addContactStart = contact => ({
  type: ContactsActionTypes.ADD_CONTACT_START,
  payload: contact
});

export const addContactSuccess = () => ({
  type: ContactsActionTypes.ADD_CONTACT_SUCCESS
});

export const addContactFailure = errorMessage => ({
  type: ContactsActionTypes.ADD_CONTACT_FAILURE,
  payload: errorMessage
});

export const updateContactStart = contact => ({
  type: ContactsActionTypes.UPDATE_CONTACT_START,
  payload: contact
});

export const updateContactSuccess = () => ({
  type: ContactsActionTypes.UPDATE_CONTACT_SUCCESS
});

export const updateContactFailure = errorMessage => ({
  type: ContactsActionTypes.UPDATE_CONTACT_FAILURE,
  payload: errorMessage
});

export const importContactsStart = fileObject => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_START,
  payload: fileObject
});

export const importContactsSuccess = () => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_SUCCESS
});

export const importContactsFailure = errorMessage => ({
  type: ContactsActionTypes.IMPORT_CONTACTS_FAILURE,
  payload: errorMessage
});

export const exportAllContactsStart = () => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_START
});

export const exportAllContactsSuccess = () => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_SUCCESS
});

export const exportAllContactsFailure = errorMessage => ({
  type: ContactsActionTypes.EXPORT_ALL_CONTACTS_FAILURE,
  payload: errorMessage
});
