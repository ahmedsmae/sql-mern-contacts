import { createSelector } from 'reselect';

export const selectMessage = state => state.message;

export const selectHidden = createSelector(
  [selectMessage],
  message => message.hidden
);

export const selectSelectedContacts = createSelector(
  [selectMessage],
  message => message.selectedContacts
);

export const selectSelectedContactsIds = createSelector(
  [selectSelectedContacts],
  selectedContacts => selectedContacts.map(({ id }) => id)
);
