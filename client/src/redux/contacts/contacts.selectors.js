import { createSelector } from 'reselect';

const selectContacts = state => state.contacts;

export const selectUserContacts = createSelector(
  [selectContacts],
  contacts => contacts.userContacts
);

export const selectSelectedContacts = createSelector(
  [selectContacts],
  contacts => contacts.selectedContacts
);

export const selectIsLoading = createSelector(
  [selectContacts],
  contacts => contacts.loading
);

export const selectSelectedContactsIds = createSelector(
  [selectSelectedContacts],
  selectedContacts => selectedContacts.map(({ id }) => id)
);

export const selectContactToEdit = createSelector(
  [selectContacts],
  contacts => contacts.contactToEdit
);

export const selectIsContactsLoaded = createSelector(
  [selectUserContacts],
  contacts => !!contacts
);
