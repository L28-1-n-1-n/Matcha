import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/chat';
import io from 'socket.io-client';

const Chat = ({ getProfiles, profile: { profiles } }) => {
  const [msg, setMsg] = useState('');
  const socket = io.connect('http://localhost:5000');
  useEffect(() => {
    console.log(socket);
    //Message from server
    socket.on('message', (message) => {
      console.log(message);
      // outputMessage(message);
    });
    getProfiles();
  }, [getProfiles]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(msg);
    // Emit message to server
    socket.emit('newChatMessage', msg);
    setMsg('');
  };

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
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <li key={profile._id}>{profile.user.firstname} </li>
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
        <form id='chat-form' onSubmit={(e) => onSubmit(e)}>
          <input
            id='message'
            name='message'
            type='text'
            placeholder='Enter Message'
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            required
            autoComplete='off'
          />
          <input type='submit' className='btn btn-primary' value='Send' />
          {/* <button className='btn'>
            <i className='fas fa-paper-plane'></i> Send
          </button> */}
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
