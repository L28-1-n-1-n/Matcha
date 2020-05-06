import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
export const Navbar = ({
  auth: { isAuthenticated, loading },

  logout,
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>All Profiles</Link>
      </li>

      <li>
        <Link to='/photos'>
          <i className='fas fa-user-plus'></i> Matches
        </Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/chat'>
          <i className='far fa-comments'></i> Chat
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-tools'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-door-open'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  // 'hide-sm' hides small items when we are on mobile devices, to make things responsive
  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark-T'>
      <h1>
        <Link to='/'>
          <i className='fas fa-fire-alt'></i> Tindurr
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
// loading is true by default
// it is set to false if we get an error or user has loggedin
// if !loading, then show <Fragment />, else null
// equivalent to { !loading ? '' : null }
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
