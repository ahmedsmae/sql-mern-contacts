import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectMessage } from '../../redux/message/message.selectors';
import { selectSelectedContactsIds } from '../../redux/contacts/contacts.selectors';
import { removeMessage } from '../../redux/message/message.actions';
import {
  deletingContactsStart,
  unselectContactsByIds
} from '../../redux/contacts/contacts.actions';

import ConfirmMessage from './confirm-message.component';

const mapStateToProps = createStructuredSelector({
  message: selectMessage,
  selectedIds: selectSelectedContactsIds
});

const mapDispatchToProps = dispatch => ({
  removeMessage: () => dispatch(removeMessage()),
  deletingContactsStart: ids => dispatch(deletingContactsStart(ids)),
  unselectContactsByIds: contacts => dispatch(unselectContactsByIds(contacts))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmMessage);
