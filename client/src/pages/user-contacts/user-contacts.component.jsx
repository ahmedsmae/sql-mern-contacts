import React, { useEffect } from 'react';
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
import { csvFromContactsArray } from '../../redux/contacts/utils';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import ContactsTable from '../../components/contacts-table/contacts-table.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './user-contacts.styles.scss';

const ContactsTableWithSpinner = WithSpinner(ContactsTable);

const UserContacts = ({
  currentUser,
  isContactsLoading,
  setMessage,
  addContactToEdit,
  history,
  importContactsStartAsync,
  selectedContacts,
  exportAllContactsStartAsync,
  loadingContactsStartAsync
}) => {
  useEffect(() => {
    loadingContactsStartAsync();
  }, [loadingContactsStartAsync]);

  const messageArgs = {
    title: 'Delete contacts confirmation',
    message: `This will delete permenently all selected contacts. Are you sure ?`,
    confirm: 'Delete',
    cancel: 'Cancel'
  };

  const downloadCsv = href => {
    // create a link to download the generated url
    const a = document.createElement('a');
    a.setAttribute('hidden', true);
    a.setAttribute('href', href);
    a.setAttribute('download', 'contacts.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  let filePick;

  return (
    <div className='user-contacts-page'>
      <h2>{`Welcome ${currentUser.name}`}</h2>
      <p>{`Your ID: ${currentUser.id}`}</p>
      <div>
        <ContactsTableWithSpinner isLoading={isContactsLoading} />
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
          onChange={e => importContactsStartAsync(e.target.files[0])}
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

        <CustomButton
          small
          grey
          onClick={() => {
            // cz this action is not connected with the state it will return a promise
            exportAllContactsStartAsync().then(res => {
              // convert the returned csv text to a downloadable blob with a specific url
              const blob = new Blob([res.data], { type: 'text/csv' });
              downloadCsv(window.URL.createObjectURL(blob));
            });
          }}
        >
          <i className='fas fa-file-export' /> Export All Contacts
        </CustomButton>

        <CustomButton onClick={() => setMessage(messageArgs)} small red>
          <i className='fas fa-trash-alt' /> Delete Selection
        </CustomButton>
      </div>
    </div>
  );
};

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
