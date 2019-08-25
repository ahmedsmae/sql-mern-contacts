import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import contactsReducer from './contacts/contacts.reducer';
import messageReducer from './message/message.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'contacts']
};

const rootReducer = combineReducers({
  user: userReducer,
  contacts: contactsReducer,
  message: messageReducer
});

export default persistReducer(persistConfig, rootReducer);
