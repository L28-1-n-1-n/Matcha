import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, removeNotifications } from '../../actions/auth';
import io from 'socket.io-client';

export const Navbar = ({
  auth: { isAuthenticated, loading, user },
  removeNotifications,
  logout,
}) => {
  const MessageItem = ({ thread }) => {
    return (
      <NavLink to={`/profile/${thread.user}`} className='main-nav'>
        {thread.msg}
      </NavLink>
    );
  };

  // all working but need to refresh page : (
  // Also need to put number of notifications after bell
  const notify = () => {
    if (user && user.notifications && user.notifications.length > 0) {
      user.notifications.forEach(function (thread) {
        if (thread.msg && thread.user) {
          console.log(thread.msg);
          toast(<MessageItem key={thread._id} thread={thread} />, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
      removeNotifications(user._id);
    }
  };
  // const socket = io.connect('http://localhost:5000');
  const [response, setResponse] = useState('');
  var socid;
  // const [socid, setSocid] = useState('');
  useEffect(() => {
    const socket = io.connect('http://localhost:5000');

    var connDetails;
    console.log(socket.id);
    console.log('user is');
    console.log(user);

    console.log('socid one', socid);

    //Message from server
    socket.on('logchannel', (message) => {
      console.log(message);
      socid = message;
      console.log('socid five', socid);

      if (user && socid) {
        connDetails = { user: user._id, sid: socid };
        console.log(connDetails);
        socket.emit('lol', connDetails);
      }
      // setMessageList(messageList);
      // outputMessage(message);
    });
    console.log('socid two', socid);
    socket.on('FromAPI', (data) => {
      setResponse(data);
    });
    console.log('socid three', socid);

    if (user && socid) {
      connDetails = { user: user._id, sid: socid };
      console.log(connDetails);
      socket.emit('lol', connDetails);
    }
    console.log('socid four', socid);
  }, [user, socid]);
  const authLinks = (
    <ul>
      <li onClick={notify}>
        <i className='fas fa-bell'></i>
        <span>
          {user && user.notifications && user.notifications.length > 0 && (
            <span>{user.notifications.length}</span>
          )}
        </span>
      </li>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
      <p>
        <time dateTime={response}>{response}</time>
      </p>
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
  removeNotifications: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, removeNotifications })(
  Navbar
);
