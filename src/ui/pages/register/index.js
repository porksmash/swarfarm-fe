import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';

import { authActions } from 'state/ducks/auth/';
import RegisterForm from './RegisterForm';

class Register extends React.Component {
  handleSubmit(values) {
    console.log(values);
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={15} tablet={8} computer={4}>
          Hello thanks for registering
          <RegisterForm handleSubmit={this.handleSubmit.bind(this)} />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  errors: state.auth.error
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Register);