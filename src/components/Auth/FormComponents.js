import React from 'react';
import './FormStyles.css';

export const FormHeader = ({ form }) => (
  <div className="box__header">
    <p className="box__header__logo">Opinion</p>
    <div className="box__header__options">
      <a
        href="/"
        className={`options__default ${form === 'signup' ? 'active' : null}`}
      >
        Signup
      </a>
      <a
        href="/"
        className={`options__default ${form === 'login' ? 'active' : null}`}
      >
        Login
      </a>
    </div>
  </div>
);

export const DefaultInput = ({ placeholder, type, name }) => (
  <input
    className="form__input"
    placeholder={placeholder}
    type={type}
    name={name}
    required
  />
);

export const FormInput = ({ placeholder, type, name }) => (
  <div className="input-wrapper input-wrapper--login">
    <DefaultInput placeholder={placeholder} type={type} name={name} />
  </div>
);

export const FormNameInput = () => (
  <div className="input-name-wrapper">
    <div className="input-wrapper input-wrapper--signup">
      <DefaultInput placeholder="First Name" type="text" name="firstname" />
    </div>
    <div className="spacer" />
    <div className="input-wrapper input-wrapper--signup">
      <DefaultInput placeholder="Last Name" type="text" name="lastname" />
    </div>
  </div>
);

export const FormButton = ({ text }) => (
  <button className="form__button">{text}</button>
);
