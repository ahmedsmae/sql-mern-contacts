import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectHidden } from '../../redux/message/message.selectors';

import { signoutUserStart } from '../../redux/user/user.actions';

import Header from './header.component';

const mapDispatchToProps = dispatch => ({
  signoutUserStart: () => dispatch(signoutUserStart())
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectHidden
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
