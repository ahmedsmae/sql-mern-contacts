import React from 'react';

import ContactsRowContainer from '../contacts-row/contacts-row.container';

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
          <th className='email hide-sm'>Email</th>
          <th className='number'>Number 1</th>
          <th className='owner hide-sm'>Owner ID</th>
          <th className='edit' />
        </tr>
      </thead>
      <tbody>
        {contacts.map(contact => (
          <ContactsRowContainer key={contact.id} contact={contact} />
        ))}
      </tbody>
    </table>
  );
};

export default ContactsTable;
