import React, { useState } from 'react';

import './sign-in.styles.scss';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const SignIn = ({ signinUserStartAsync }) => {
  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = userCredentials;

    signinUserStartAsync({ email, password });

    setCredentials({ email: '', password: '' });
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const { email, password } = userCredentials;

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with email and password</span>

      <form className='sign-in-form' onSubmit={handleSubmit}>
        <FormInput
          type='email'
          name='email'
          handleChange={handleChange}
          value={email}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          handleChange={handleChange}
          value={password}
          label='Password'
          required
        />

        <CustomButton type='submit'>Sign in</CustomButton>
      </form>
    </div>
  );
};

export default SignIn;
