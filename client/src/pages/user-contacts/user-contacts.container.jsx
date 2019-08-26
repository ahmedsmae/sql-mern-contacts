import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectSelectedContacts,
  selectIsContactsLoaded
} from '../../redux/contacts/contacts.selectors';

import {
  addContactToEdit,
  importContactsStart,
  exportAllContactsStart,
  loadingContactsStart
} from '../../redux/contacts/contacts.actions';
import { setMessage } from '../../redux/message/message.actions';

import UserContacts from './user-contacts.component';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  selectedContacts: selectSelectedContacts,
  isContactsLoaded: selectIsContactsLoaded
});

const mapDispatchToProps = dispatch => ({
  setMessage: args => dispatch(setMessage(args)),
  addContactToEdit: contact => dispatch(addContactToEdit(contact)),
  importContactsStart: filePath => dispatch(importContactsStart(filePath)),
  exportAllContactsStart: () => dispatch(exportAllContactsStart()),
  loadingContactsStart: () => dispatch(loadingContactsStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContacts);
