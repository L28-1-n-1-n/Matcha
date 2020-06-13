import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData; // pull variables out of formData so we don't have to do formData.name, etc

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  // call setFormData, ...formData makes a copy of hte object {name, email, passowrd, password2}
  // change the name to the value of the input (e.target.value)
  // [e.target.name] used instead of name since different fields have differnt names (name, email, password, etc).
  // The "name" in e.target.name is a field

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
    var begin_timestamp = new Date();
    var refresh = window.localStorage.getItem('refresh');

    window.localStorage.setItem('refresh', begin_timestamp.getTime().valueOf());
    console.log('beginning time', refresh);
  };

  // Redirect if logged in

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <h1 className='large text-primary-T'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user-shield'></i> Sign Into Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            minLength='6'
          />
        </div>

        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
      <p className='my-1'>
        <Link to='/recuperation'>Forgotten Password?</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
