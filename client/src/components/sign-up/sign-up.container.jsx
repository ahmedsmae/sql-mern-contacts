import { connect } from 'react-redux';
import { registerUserStart } from '../../redux/user/user.actions';

import SignUp from './sign-up.component';

const mapDispatchToProps = dispatch => ({
  registerUserStart: userCredentials =>
    dispatch(registerUserStart(userCredentials))
});

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
