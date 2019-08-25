import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectSelectedContactsIds,
  selectUserContacts
} from '../../redux/contacts/contacts.selectors';

import {
  selectAllContacts,
  unselectAllContacts
} from '../../redux/contacts/contacts.actions';

import ContactsTable from './contacts-table.component';

const mapDispatchToProps = dispatch => ({
  selectAllContacts: () => dispatch(selectAllContacts()),
  unselectAllContacts: () => dispatch(unselectAllContacts())
});

const mapStateToProps = createStructuredSelector({
  selectedContactsIds: selectSelectedContactsIds,
  contacts: selectUserContacts
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsTable);
