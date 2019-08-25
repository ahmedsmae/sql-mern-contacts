import { connect } from 'react-redux';
import { registerUserStartAsync } from '../../redux/user/user.actions';

import SignUp from './sign-up.component';

const mapDispatchToProps = {
  registerUserStartAsync
};

export default connect(
  null,
  mapDispatchToProps
)(SignUp);
