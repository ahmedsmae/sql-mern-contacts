import React, { useEffect } from 'react';

import { messageArgs, downloadCsv } from './utils';

import { csvFromContactsArray } from '../../redux/contacts/utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import ContactsTableContainer from '../../components/contacts-table/contacts-table.container';
import CustomButton from '../../components/custom-button/custom-button.component';

import './user-contacts.styles.scss';

const ContactsTableContainerWithSpinner = WithSpinner(ContactsTableContainer);

const UserContacts = ({
  currentUser,
  setMessage,
  addContactToEdit,
  history,
  importContactsStart,
  selectedContacts,
  exportAllContactsStart,
  loadingContactsStart,
  isContactsLoaded
}) => {
  useEffect(() => {
    loadingContactsStart();
  }, [loadingContactsStart]);

  let filePick;

  return (
    <div className='user-contacts-page'>
      <h2>{`Welcome ${currentUser.name}`}</h2>
      <p>{`Your ID: ${currentUser.id}`}</p>
      <div>
        <ContactsTableContainerWithSpinner isLoading={!isContactsLoaded} />
      </div>
      <div className='table-controllers'>
        <CustomButton
          small
          green
          onClick={() => {
            addContactToEdit(null);
            history.push('/contact');
          }}
        >
          <i className='fas fa-plus' /> Add New Contact
        </CustomButton>

        <CustomButton grey small onClick={() => filePick.click()}>
          <i className='fas fa-file-import' /> Import Contacts
        </CustomButton>
        <input
          style={{ display: 'none' }}
          type='file'
          onChange={e => importContactsStart(e.target.files[0])}
          accept='.csv'
          ref={fileInput => (filePick = fileInput)}
        />

        <CustomButton
          grey
          small
          onClick={() =>
            // only if there is a selected contacts run this function
            selectedContacts.length &&
            downloadCsv(csvFromContactsArray(selectedContacts))
          }
        >
          <i className='fas fa-file-export' /> Export Selection
        </CustomButton>

        <CustomButton small grey onClick={() => exportAllContactsStart()}>
          <i className='fas fa-file-export' /> Export All Contacts
        </CustomButton>

        <CustomButton onClick={() => setMessage(messageArgs)} small red>
          <i className='fas fa-trash-alt' /> Delete Selection
        </CustomButton>
      </div>
    </div>
  );
};

export default UserContacts;
