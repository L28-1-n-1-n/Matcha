import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fpReset } from '../../actions/verification';
import { setAlert } from '../../actions/alert';
const Reset = ({ setAlert, fpReset, match }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });
  const [showText, setShowText] = useState(false);
  const { password, password2 } = formData; // pull variables out of formData so we don't have to do formData.name, etc

  const token = match.params.token;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // call setFormData, ...formData makes a copy of hte object {name, email, passowrd, password2}
  // change the name to the value of the input (e.target.value)
  // [e.target.name] used instead of name since different fields have differnt names (name, email, password, etc).
  // The "name" in e.target.name is a field

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger'); // alert type is danger
    } else {
      // register({ name, email, password });
      fpReset({ token, password });
      setShowText(!showText);
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Reset Passowrd</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Please put in a new password.
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Confirm' />
        {showText && (
          <div>
            <p className='lead'>Please login again.</p>
          </div>
        )}
      </form>
    </Fragment>
  );
};

Reset.propTypes = {
  fpReset: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert, fpReset })(Reset);
