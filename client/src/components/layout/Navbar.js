import React, { Fragment, useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, Redirect } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout, removeNotifications } from '../../actions/auth';

import io from 'socket.io-client';
import { socket } from '../../actions/socClient';
// import { getCurrentProfile } from '../../actions/profile';
import { loadUser } from '../../actions/auth';
import store from '../../store';
import setAuthToken from '../../utils/setAuthToken';

export const Navbar = ({
  auth: { isAuthenticated, loading, user },
  removeNotifications,
  logout,
  loadUser,
}) => {
  const refreshPage = () => {
    var now2 = new Date();

    var refresh = window.localStorage.getItem('refresh');

    var now3 = now2.getTime().valueOf();
    console.log('in function refresh is', refresh);
    console.log('in function, now2.getTime() gives', now3);
    console.log('difference is ', now3 - refresh);
    console.log('type is ', typeof (now3 - refresh));

    if (now3 - refresh > 8000) {
      console.log('we are refreshing');
      window.localStorage.setItem('refresh', now2.getTime().valueOf());

      window.location.reload();
      console.log('now refresh is ', refresh);
    }
    // window.location.reload();
    // socket.on('logchannel', (message) => {
    //   console.log(message);
    //   socid = message;
    //   console.log(' we are in refresh loop');
    //   console.log('socid five', socid);

    //   console.log('after socid five, user is', user);
    //   if (user && socid) {
    //     connDetails = { user: user._id, name: user.firstname, sid: socid };
    //     console.log(connDetails);
    //     socket.emit('lol', connDetails);
    //   }
    // });
  };
  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();

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

  const [response, setResponse] = useState('');
  const [toggleRefresh, setToggleRefresh] = useState(false);
  var socid;
  var connDetails;
  // const [socid, setSocid] = useState('');
  useEffect(() => {
    // const socket = io.connect('http://localhost:5000');

    // var connDetails;
    console.log(socket.id);
    socid = socket.id;
    console.log('user is');
    console.log(user);

    console.log('socid one', socid);
    if (user && socid) {
      connDetails = { user: user._id, sid: socid };
      console.log('ONE');
      console.log(connDetails);
      socket.emit('lol', connDetails);
      // window.localStorage.setItem('refresh', 0);
    }

    //Message from server
    socket.on('logchannel', (message) => {
      console.log(message);
      socid = message;
      console.log('socid five', socid);

      console.log('after socid five, user is', user);
      // if (user && socid) {
      //   connDetails = { user: user._id, name: user.firstname, sid: socid };
      //   console.log('TWO');
      //   console.log(connDetails);
      //   socket.emit('lol', connDetails);
      // }
    });

    console.log('socid two', socid);
    // socket.on('FromAPI', (data) => {
    //   setResponse(data);
    // });
    // console.log('socid three', socid);

    // if (user && socid) {
    //   connDetails = { user: user._id, sid: socid };
    //   console.log(connDetails);
    //   socket.emit('lol', connDetails);
    // }
    console.log('socid four', socid);
    socket.on('refreshTarget', (target_ID) => {
      console.log(target_ID);

      if (user && target_ID == user._id) {
        console.log('we will refresh');

        console.log('Before ', window.localStorage.getItem('refresh'));
        refreshPage();

        console.log('after', window.localStorage.getItem('refresh'));
      }
      // if (user && target_ID == user._id) {
      //   console.log('we will refresh');
      //   forceUpdate();
      // }
    });
  }, [user, socid]);

  console.log('NAV user is', user);
  // socket.on('logchannel', (message) => {
  //   console.log(message);
  //   socid = message;
  //   console.log('socid five', socid);

  //   console.log('after socid five, user is', user);
  //   if (user && socid) {
  //     connDetails = { user: user._id, name: user.firstname, sid: socid };
  //     console.log(connDetails);
  //     socket.emit('lol', connDetails);
  //   }
  // });
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
  loadUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {
  logout,
  removeNotifications,
  loadUser,
})(Navbar);
