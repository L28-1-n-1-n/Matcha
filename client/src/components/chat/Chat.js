import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import moment from 'moment';
import io from 'socket.io-client';
import { socket } from '../../actions/socClient';

const Chat = ({
  getCurrentProfile,
  profile: {
    profile: { user, correspondances },
  },
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [targetSoc, setTargetSoc] = useState({});
  const [userList, setUserList] = useState([]);

  const MessageItem = ({ item }) => {
    return (
      <div className='message'>
        <p className='meta'>
          {item.name} <span>{item.time}</span>
        </p>
        <p className='text'>{item.chatMsg}</p>
      </div>
    );
  };

  const findTargetSoc = (userID) => {
    let tmp = userList.findIndex((x) => x.user === userID);
    if (tmp !== -1) {
      setTargetSoc(userList[tmp]);
      console.log('targetSoc is ', targetSoc);
    }
  };
  const getInit = () => {
    socket.emit('initialList', userList);
    socket.on('listupdate', (list) => {
      setUserList(list);
    });
  };
  useEffect(() => {
    getInit();
    //Message from server
    socket.on('listupdate', (list) => {
      setUserList(list);
    });
    socket.on('message', (message) => {
      console.log(message);

      setMessageList((prevState) => [
        ...prevState,
        // { name: user.firstname, time: now.format('LLL'), chatMsg: message },
        message,
      ]);

      // outputMessage(message);
    });

    getCurrentProfile();
  }, [getCurrentProfile]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputMsg);
    var now = new moment();
    var transMsg = {
      userid: user._id,
      name: user.firstname,
      timestamp: now.valueOf(),
      time: now.format('LLL'),
      chatMsg: inputMsg,
    };
    // Emit message to server
    if (targetSoc) {
      socket.emit('newChatMessage', transMsg, targetSoc.sid);
    }
    setInputMsg('');
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
            Users <i className='fas fa-user-friends'></i>
          </h3>
          <ul id='users'>
            {correspondances.length > 0 ? (
              correspondances.map((connection) => (
                <li
                  onClick={() => findTargetSoc(connection.user)}
                  key={connection._id}
                >
                  {connection.name.toString()}{' '}
                </li>
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </ul>
        </div>

        <div className='chat-messages'>
          {messageList &&
            messageList.map((item) => (
              <MessageItem key={item.timestamp} item={item} />
            ))}
        </div>
      </main>
      <div className='chat-form-container'>
        <form id='chat-form' onSubmit={(e) => onSubmit(e)}>
          <input
            id='message'
            name='message'
            type='text'
            placeholder='Enter Message'
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
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
  getCurrentProfile: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Chat);

// export default Chat;
