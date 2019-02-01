import React from 'react';
import { FormHeader, FormInput, FormButton } from './FormComponents';
import './FormStyles.css';

const Login = () => (
  <div className="box-wrapper">
    <div className="box-container box-container--login">
      <FormHeader form="login" />
      <form className="form-wrapper">
        <FormInput placeholder="Email Address" type="email" name="email" />
        <FormInput placeholder="Password" type="password" name="password" />
        <FormButton text="Login" />
      </form>
      <div className="reset-password">
        <p>
          Forgot your password? <a href="/">Click here</a>
        </p>
      </div>
    </div>
  </div>
);

export default Login;
