import React from 'react';
import { FormHeader } from './FormComponents';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { signup } from '../../actions/authActions';
import './FormStyles.css';

class Signup extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signup(this.state, this.props.firebase);
    console.log(this.state);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { authError } = this.props;

    return (
      <div className="box-wrapper">
        <div className="box-container box-container--signup">
          <FormHeader form="signup" />
          {authError && <p className="error-message">{authError}</p>}
          <form className="form-wrapper--signup" onSubmit={this.handleSubmit}>
            <div className="input-name-wrapper">
              <div className="input-wrapper input-wrapper--signup">
                <input
                  className="form__input"
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div className="form-spacer" />
              <div className="input-wrapper input-wrapper--signup">
                <input
                  className="form__input"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  onChange={this.handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-wrapper input-wrapper--login">
              <input
                className="form__input"
                placeholder="Email Address"
                type="email"
                name="email"
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="input-wrapper input-wrapper--login">
              <input
                className="form__input"
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
                required
              />
            </div>
            <button className="form__button">Create account</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
  authError: state.auth.signup.authError,
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { signup }
  )
)(Signup);
