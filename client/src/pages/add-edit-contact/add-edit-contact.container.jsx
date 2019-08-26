import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectContactToEdit } from '../../redux/contacts/contacts.selectors';

import {
  addContactStart,
  updateContactStart
} from '../../redux/contacts/contacts.actions';

import AddEditContact from './add-edit-contact.component';

const mapStateToProps = createStructuredSelector({
  contact: selectContactToEdit
});

const mapDispatchToProps = dispatch => ({
  addContactStart: contact => dispatch(addContactStart(contact)),
  updateContactStart: contact => dispatch(updateContactStart(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditContact);
