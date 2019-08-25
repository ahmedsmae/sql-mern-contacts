import React from 'react';
import { Link } from 'react-router-dom';

import ConfirmMessage from '../confirm-message/confirm-message.component';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = ({ currentUser, signoutUserStartAsync, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo />
    </Link>

    <div className='options'>
      <Link className='option' to='/about'>
        ABOUT
      </Link>
      {currentUser ? (
        <Link className='option' to='/' onClick={() => signoutUserStartAsync()}>
          SIGN OUT
        </Link>
      ) : null}
      <span className='option'>{currentUser ? currentUser.name : ''}</span>
    </div>
    {!hidden && <ConfirmMessage />}
  </div>
);

export default Header;
