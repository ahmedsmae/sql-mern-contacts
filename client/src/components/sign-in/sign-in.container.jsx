import { connect } from 'react-redux';
import { signinUserStartAsync } from '../../redux/user/user.actions';

import SignIn from './sign-in.component';

const mapDispatchToProps = {
  signinUserStartAsync
};

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
