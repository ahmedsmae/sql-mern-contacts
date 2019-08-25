import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectContactToEdit } from '../../redux/contacts/contacts.selectors';

import {
  addContactStartAsync,
  updateContactStartAsync
} from '../../redux/contacts/contacts.actions';

import AddEditContact from './add-edit-contact.component';

const mapStateToProps = createStructuredSelector({
  contact: selectContactToEdit
});

const mapDispatchToProps = {
  addContactStartAsync,
  updateContactStartAsync
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditContact);
