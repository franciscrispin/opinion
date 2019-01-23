import React from 'react';
import {
  FormHeader,
  FormInput,
  FormNameInput,
  FormButton,
} from './FormComponents';
import './FormStyles.css';

const Signup = () => (
  <div className="box-wrapper">
    <div className="box-container box-container--signup">
      <FormHeader form="signup" />
      <form className="form-wrapper">
        <FormNameInput />
        <FormInput placeholder="Email Address" type="email" name="email" />
        <FormInput placeholder="Password" type="password" name="password" />
        <FormButton text="Create account" />
      </form>
    </div>
  </div>
);

export default Signup;
