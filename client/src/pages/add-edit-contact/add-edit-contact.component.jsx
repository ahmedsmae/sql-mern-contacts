import React, { useState, useEffect } from 'react';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import './add-edit-contact.styles.scss';

const AddEditContact = ({
  contact,
  addContactStartAsync,
  updateContactStartAsync,
  history
}) => {
  const [currentContact, setCurrentContact] = useState({
    firstname: '',
    lastname: '',
    age: '',
    email: '',
    address: '',
    number1: '',
    number2: ''
  });

  useEffect(() => {
    contact &&
      setCurrentContact({
        firstname: contact.firstname,
        lastname: contact.lastname,
        age: contact.age,
        email: contact.email,
        address: contact.address,
        number1: contact.number1,
        number2: contact.number2
      });
  }, [contact]);

  const handleChange = e => {
    const { name, value } = e.target;
    setCurrentContact({ ...currentContact, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    contact
      ? updateContactStartAsync({ ...currentContact, id: contact.id })
      : addContactStartAsync(currentContact);

    history.push('/user-contacts');
  };

  const {
    firstname,
    lastname,
    age,
    email,
    address,
    number1,
    number2
  } = currentContact;

  return (
    <div className='add-edit-contact'>
      <h2>{contact ? 'Edit Contact' : 'Add New Contact'}</h2>
      <form className='add-edit-contact-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='firstname'
          handleChange={handleChange}
          value={firstname}
          label='First Name'
          required
        />
        <FormInput
          type='text'
          name='lastname'
          handleChange={handleChange}
          value={lastname}
          label='Last Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          handleChange={handleChange}
          value={email}
          label='Email'
        />
        <FormInput
          type='text'
          name='age'
          handleChange={handleChange}
          value={age}
          label='Age'
        />
        <FormInput
          type='text'
          name='address'
          handleChange={handleChange}
          value={address}
          label='Address'
        />
        <FormInput
          type='text'
          name='number1'
          handleChange={handleChange}
          value={number1}
          label='1st Number'
          required
        />
        <FormInput
          type='text'
          name='number2'
          handleChange={handleChange}
          value={number2}
          label='2nd Number'
        />

        <div className='buttons'>
          <CustomButton green onClick={() => history.push('/user-contacts')}>
            {contact ? 'Cancel Changes' : 'Cancel'}
          </CustomButton>
          <CustomButton red type='submit'>
            {contact ? 'Save Changes' : 'Add Contact'}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default AddEditContact;
