import MessageActionTypes from './message.types';

export const setMessage = messageArgs => ({
  type: MessageActionTypes.SET_MESSAGE,
  payload: messageArgs
});

export const removeMessage = () => ({
  type: MessageActionTypes.REMOVE_MESSAGE
});
