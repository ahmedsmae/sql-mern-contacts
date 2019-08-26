import React, { Fragment } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './contacts-row.styles.scss';

const ContactsRow = ({
  contact,
  addSelectedContact,
  removeSelectedContact,
  selectedContactsIds,
  addContactToEdit,
  history
}) => {
  const { id, firstname, lastname, email, number1, owner } = contact;

  const ifChecked = () => selectedContactsIds.includes(id);

  return (
    <Fragment>
      <tr>
        <td className='select'>
          <input
            type='checkbox'
            checked={ifChecked()}
            onChange={({ target: { checked } }) =>
              checked
                ? addSelectedContact(contact)
                : removeSelectedContact(contact)
            }
          />
        </td>
        <td className='id'>{id}</td>
        <td className='first-name'>{firstname}</td>
        <td className='last-name'>{lastname}</td>
        <td className='email'>{email}</td>
        <td className='number'>{number1}</td>
        <td className='owner'>{owner}</td>
        <td>
          <CustomButton
            icon
            green
            type='button'
            onClick={() => {
              addContactToEdit(contact);
              history.push('/contact');
            }}
          >
            <i className='fas fa-pencil-alt' />
          </CustomButton>
        </td>
      </tr>
    </Fragment>
  );
};

export default ContactsRow;
