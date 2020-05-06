import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/chat';
import io from 'socket.io-client';

const Chat = ({ getProfiles, profile: { profiles } }) => {
  const [msg, setMsg] = useState('');
  const [messageList, setMessageList] = useState('');
  const socket = io.connect('http://localhost:5000');
  useEffect(() => {
    console.log(socket);
    //Message from server
    socket.on('message', (message) => {
      console.log(message);
      setMessageList(messageList);
      // outputMessage(message);
    });
    getProfiles();
  }, [getProfiles, messageList]);
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
          <i className='far fa-comments'></i> Instant Chat
        </h1>
      </header>
      <main className='chat-main'>
        <div className='chat-sidebar'>
          <h3>
            Users <i class='fas fa-user-friends'></i>
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
              User 1 <span>7:22pm</span>
            </p>
            <p className='text'>
              This is a sample chat in case I do not have time to complete this
              function. {/* {messageList} */}
            </p>
          </div>
          <div className='message'>
            <p className='meta'>
              User 2 <span>7:55pm</span>
            </p>
            <p className='text'>
              The box to write message below should still work and send messges
              to the console.
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
