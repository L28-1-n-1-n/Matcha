import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/chat';

import io from 'socket.io-client';

const Chat = ({ getProfiles, profile: { profiles }, socket }) => {
  useEffect(() => {
    const socket = io.connect('http://localhost:5000');
    console.log(socket);

    socket.on('message', (message) => {
      console.log(message);
    });
    getProfiles();
  }, [getProfiles]);
  return (
    <div className='chat-container'>
      <header className='chat-header'>
        <h1>
          <i className='fas fa-smile'></i> ChatCord
        </h1>
        <a href='index.html' className='btn'>
          Leave Room
        </a>
      </header>
      <main className='chat-main'>
        <div className='chat-sidebar'>
          <h3>
            <i className='fas fa-comments'></i> Room Name:
          </h3>
          <h2 id='room-name'>JavaScript</h2>
          <h3>
            <i className='fas fa-users'></i> Users
          </h3>
          <ul id='users'>
            {/* <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li> */}

            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <li key={profile._id}>{profile.user.name} </li>
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </ul>
        </div>
        <div className='chat-messages'>
          <div className='message'>
            <p className='meta'>
              Brad <span>9:12pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              Mary <span>9:15pm</span>
            </p>
            <p className='text'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
              repudiandae.
            </p>
          </div>
        </div>
      </main>
      <div className='chat-form-container'>
        <form id='chat-form'>
          <input
            id='msg'
            type='text'
            placeholder='Enter Message'
            required
            autoComplete='off'
          />
          <button className='btn'>
            <i className='fas fa-paper-plane'></i> Send
          </button>
        </form>
      </div>
    </div>
  );
};

Chat.propTypes = {
  getProfiles: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Chat);

// export default Chat;
