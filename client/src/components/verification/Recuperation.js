import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fpCheckEmail } from '../../actions/verification';

const Recuperation = ({ fpCheckEmail }) => {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [showText, setShowText] = useState(false);
  const { email } = formData; // pull variables out of formData so we don't have to do formData.firstname, etc

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // call setFormData, ...formData makes a copy of the object {firstname, email, passowrd, password2}
  // change the name to the value of the input (e.target.value)
  // [e.target.name] used instead of name since different fields have differnt names (firstname, email, password, etc).
  // The "name" in e.target.name is a field

  const onSubmit = async (e) => {
    e.preventDefault();

    fpCheckEmail({ email });
    setShowText(!showText);
  };

  // Redirect if logged in

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Passowrd</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Please enter the email you registered
        with.
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Email Me' />
        {showText && (
          <div>
            <p className='lead'>
              If the provided email address matches that account's verified
              email address, you'll receive an email with the reset link
              shortly.
            </p>
          </div>
        )}
      </form>
    </Fragment>
  );
};

Recuperation.propTypes = {
  fpCheckEmail: PropTypes.func.isRequired,
};

export default connect(null, { fpCheckEmail })(Recuperation);
