import MessageActionTypes from './message.types';

const INITIAL_STATE = {
  hidden: true,
  title: null,
  message: null,
  confirm: null,
  cancel: null
};

const messageReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case MessageActionTypes.SET_MESSAGE:
      return {
        hidden: false,
        ...payload
      };

    case MessageActionTypes.REMOVE_MESSAGE:
      return { ...INITIAL_STATE };

    default:
      return state;
  }
};

export default messageReducer;
