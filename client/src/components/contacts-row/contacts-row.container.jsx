import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  addSelectedContact,
  removeSelectedContact,
  addContactToEdit
} from '../../redux/contacts/contacts.actions';

import { selectSelectedContactsIds } from '../../redux/contacts/contacts.selectors';

import ContactsRow from './contacts-row.component';

const mapStateToProps = createStructuredSelector({
  selectedContactsIds: selectSelectedContactsIds
});

const mapDispatchToProps = dispatch => ({
  addSelectedContact: contact => dispatch(addSelectedContact(contact)),
  removeSelectedContact: contact => dispatch(removeSelectedContact(contact)),
  addContactToEdit: contact => dispatch(addContactToEdit(contact))
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ContactsRow);
