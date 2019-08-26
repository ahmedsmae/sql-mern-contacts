import { connect } from 'react-redux';
import { signinUserStart } from '../../redux/user/user.actions';

import SignIn from './sign-in.component';

const mapDispatchToProps = dispatch => ({
  signinUserStart: userCredentials => dispatch(signinUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
