import ContactsAcyionTypes from './contacts.types';
import { unselectContactsByIds } from './utils';

const INITIAL_STATE = {
  userContacts: null,
  selectedContacts: [],
  contactToEdit: null,
  loading: false,
  errorMessage: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ContactsAcyionTypes.LOADING_CONTACTS_START:
      return {
        ...state,
        userContacts: null,
        loading: true,
        errorMessage: null
      };

    case ContactsAcyionTypes.LOADING_CONTACTS_SUCCESS:
      return {
        ...state,
        userContacts: payload,
        loading: false,
        errorMessage: null
      };

    case ContactsAcyionTypes.LOADING_CONTACTS_FAILURE:
      return {
        ...state,
        userContacts: null,
        loading: false,
        errorMessage: payload
      };

    case ContactsAcyionTypes.ADD_SELECTED_CONTACT:
      return {
        ...state,
        selectedContacts: [...state.selectedContacts, payload]
      };

    case ContactsAcyionTypes.REMOVE_SELECTED_CONTACT:
      return {
        ...state,
        selectedContacts: state.selectedContacts.filter(
          ({ id }) => id !== payload.id
        )
      };

    case ContactsAcyionTypes.SELECT_ALL_CONTACTS:
      return {
        ...state,
        selectedContacts: state.userContacts
      };

    case ContactsAcyionTypes.UNSELECT_ALL_CONTACTS:
      return {
        ...state,
        selectedContacts: []
      };

    case ContactsAcyionTypes.UNSELECT_CONTACTS_BY_IDS:
      return {
        ...state,
        selectedContacts: unselectContactsByIds(state.selectedContacts, payload)
      };

    case ContactsAcyionTypes.ADD_CONTACT_TO_EDIT:
      return {
        ...state,
        contactToEdit: payload
      };

    case ContactsAcyionTypes.ADD_CONTACT_START:
    case ContactsAcyionTypes.UPDATE_CONTACT_START:
    case ContactsAcyionTypes.IMPORT_CONTACTS_START:
    case ContactsAcyionTypes.EXPORT_ALL_CONTACTS_START:
      return {
        ...state,
        loading: true,
        errorMessage: null
      };

    case ContactsAcyionTypes.ADD_CONTACT_SUCCESS:
    case ContactsAcyionTypes.UPDATE_CONTACT_SUCCESS:
    case ContactsAcyionTypes.IMPORT_CONTACTS_SUCCESS:
    case ContactsAcyionTypes.EXPORT_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: null
      };

    case ContactsAcyionTypes.ADD_CONTACT_FAILURE:
    case ContactsAcyionTypes.UPDATE_CONTACT_FAILURE:
    case ContactsAcyionTypes.IMPORT_CONTACTS_FAILURE:
    case ContactsAcyionTypes.EXPORT_ALL_CONTACTS_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};
