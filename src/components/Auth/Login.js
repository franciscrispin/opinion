import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { FormHeader } from './FormComponents';
import { login } from '../../actions/authActions';
import './FormStyles.css';

class Login extends React.Component {
  state = { email: '', password: '' };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.login(this.state, this.props.firebase);
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="box-wrapper">
        <div className="box-container box-container--login">
          <FormHeader form="login" />
          <form className="form-wrapper" onSubmit={this.handleSubmit}>
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
            <button className="form__button">Login</button>
          </form>
          <div className="reset-password">
            <p>
              Forgot your password? <a href="/">Click here</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(
    mapStateToProps,
    { login }
  )
)(Login);
