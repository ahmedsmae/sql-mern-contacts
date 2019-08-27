import React, { Fragment } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './confirm-message.styles.scss';

const ConfirmMessage = ({
  message: { title, message, confirm, cancel },
  removeMessage,
  deletingContactsStart,
  selectedIds,
  unselectContactsByIds
}) => {
  return (
    <Fragment>
      <div className='background' onClick={() => removeMessage()} />
      <div className='message-container'>
        <div className='message-container2'>
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
                  deletingContactsStart(selectedIds);
                  removeMessage();
                  unselectContactsByIds(selectedIds);
                }}
              >
                {confirm}
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmMessage;
