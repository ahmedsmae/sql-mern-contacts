import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMessage } from '../../redux/message/message.selectors';
import { selectSelectedContactsIds } from '../../redux/contacts/contacts.selectors';
import { removeMessage } from '../../redux/message/message.actions';
import {
  deletingContactsStartAsync,
  unselectContactsByIds
} from '../../redux/contacts/contacts.actions';

import CustomButton from '../custom-button/custom-button.component';

import './confirm-message.styles.scss';

const ConfirmMessage = ({
  message: { title, message, confirm, cancel },
  removeMessage,
  deletingContactsStartAsync,
  selectedIds,
  unselectContactsByIds
}) => {
  return (
    <Fragment>
      <div
        className='background'
        onClick={event => {
          removeMessage();
        }}
      />
      <div className='confirm-message' onClick={() => {}}>
        <h2 className='title'>{title}</h2>
        <p className='message'>{message}</p>
        <div className='buttons'>
          <CustomButton
            grey
            onClick={() => {
              removeMessage();
            }}
          >
            {cancel}
          </CustomButton>
          <CustomButton
            red
            onClick={() => {
              deletingContactsStartAsync(selectedIds);
              removeMessage();
              unselectContactsByIds(selectedIds);
            }}
          >
            {confirm}
          </CustomButton>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  message: selectMessage,
  selectedIds: selectSelectedContactsIds
});

const mapDispatchToProps = dispatch => ({
  removeMessage: () => dispatch(removeMessage()),
  deletingContactsStartAsync: ids => dispatch(deletingContactsStartAsync(ids)),
  unselectContactsByIds: contacts => dispatch(unselectContactsByIds(contacts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmMessage);
