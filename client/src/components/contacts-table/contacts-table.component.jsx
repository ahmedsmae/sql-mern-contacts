import React from 'react';
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

import ContactsRow from '../contacts-row/contacts-row.component';

import './contacts-table.styles.scss';

const ContactsTable = ({
  contacts,
  selectedContactsIds,
  selectAllContacts,
  unselectAllContacts
}) => {
  // const allSelected = () => {
  //   const diff = contacts.filter(({ id }) => !selectedContactsIds.includes(id));
  //   console.log(diff);
  //   if (diff) {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    <table className='contacts-table'>
      <thead className='table-header'>
        <tr>
          <th className='select'>
            <input
              type='checkbox'
              // checked={allSelected()}
              onChange={({ target: { checked } }) =>
                checked ? selectAllContacts() : unselectAllContacts()
              }
            />
          </th>
          <th className='id'>ID</th>
          <th className='first-name'>First Name</th>
          <th className='last-name'>Last Name</th>
          <th className='email'>Email</th>
          <th className='number'>Number 1</th>
          <th className='owner'>Owner ID</th>
          <th className='edit' />
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <ContactsRow key={contact.id} contact={contact} />
        ))}
      </tbody>
    </table>
  );
};

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
