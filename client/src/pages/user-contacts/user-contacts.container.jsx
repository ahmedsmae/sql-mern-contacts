import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectSelectedContacts,
  selectIsLoading
} from '../../redux/contacts/contacts.selectors';

import {
  addContactToEdit,
  importContactsStartAsync,
  exportAllContactsStartAsync,
  loadingContactsStartAsync
} from '../../redux/contacts/contacts.actions';
import { setMessage } from '../../redux/message/message.actions';

import UserContacts from './user-contacts.component';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isContactsLoading: selectIsLoading,
  selectedContacts: selectSelectedContacts
});

const mapDispatchToProps = dispatch => ({
  setMessage: args => dispatch(setMessage(args)),
  addContactToEdit: contact => dispatch(addContactToEdit(contact)),
  importContactsStartAsync: filePath =>
    dispatch(importContactsStartAsync(filePath)),
  exportAllContactsStartAsync: () => dispatch(exportAllContactsStartAsync()),
  loadingContactsStartAsync: () => dispatch(loadingContactsStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContacts);
