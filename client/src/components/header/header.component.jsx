import React from 'react';
import { Link } from 'react-router-dom';

import ConfirmMessageContainer from '../confirm-message/confirm-message.container';

import { ReactComponent as Logo } from '../../assets/logo.svg';

import './header.styles.scss';

const Header = ({ currentUser, signoutUserStart, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo />
    </Link>

    <div className='options'>
      <Link className='option' to='/about'>
        ABOUT
      </Link>
      {currentUser ? (
        <Link className='option' to='/' onClick={() => signoutUserStart()}>
          SIGN OUT
        </Link>
      ) : null}
    </div>
    {!hidden && <ConfirmMessageContainer />}
  </div>
);

export default Header;
