import React, { Fragment, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import moment from 'moment';
import io from 'socket.io-client';
import { socket } from '../../actions/socClient';
import { postConversation } from '../../actions/conversation';
const Chat = ({
  getCurrentProfile,
  postConversation,
  profile: {
    profile: { user, correspondances },
  },
}) => {
  const [inputMsg, setInputMsg] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [targetSoc, setTargetSoc] = useState({});
  const [userList, setUserList] = useState([]);
  const [targetUserID, setTargetUserID] = useState('');
  const chatMessages = document.querySelector('.chat-messages');

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behaviour: 'smooth' });
  };
  const MessageItem = ({ item }) => {
    return (
      <div className='message'>
        {item.name && item.chatMsg && (
          <Fragment>
            <p className='meta'>
              {item.name} <span>{item.time}</span>
            </p>
            <p className='text'>{item.chatMsg}</p>
          </Fragment>
        )}
      </div>
    );
  };

  const findTargetSoc = (userID) => {
    console.log(userID);
    let tmp = userList.findIndex((x) => x.user === userID);
    // If user is online
    if (tmp !== -1) {
      setTargetSoc(userList[tmp]);
      console.log('targetSoc is ', targetSoc);
    }
    if (userID) {
      console.log('setting userid');
      console.log(userID);
      setTargetUserID(userID);
      console.log(targetUserID);
    }
  };

  const isUserOnline = (userID) => {
    if (userList.findIndex((x) => x.user === userID) !== -1) {
      return 1;
    } else {
      return 0;
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
      // Scroll down automatically as messages accumulate
      // chatMessages.scrollTop = chatMessages.scrollHeight;
      scrollToBottom();
      // outputMessage(message);
    });

    getCurrentProfile();
    console.log(targetSoc);
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
    if (targetUserID) {
      console.log('targetUserID is ');
      console.log(targetUserID);
      postConversation(targetUserID, transMsg);
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
            Connected Users <i className='fas fa-user-friends'></i>
          </h3>
          <ul id='users'>
            {correspondances.length > 0 ? (
              correspondances.map((connection) => (
                <li
                  onClick={() => findTargetSoc(connection.user)}
                  key={connection._id}
                >
                  {' '}
                  {isUserOnline(connection.user) ? (
                    <i
                      className='fas fa-circle'
                      style={{ color: 'chartreuse' }}
                    ></i>
                  ) : (
                    <i className='fas fa-circle' style={{ color: 'red' }}></i>
                  )}{' '}
                  {connection.name.toString()}{' '}
                </li>
              ))
            ) : (
              <h4> No profiles found...</h4>
            )}
          </ul>
        </div>
        {targetSoc.sid ? (
          <div className='chat-messages'>
            {messageList &&
              messageList.map((item) => (
                <MessageItem key={item.timestamp} item={item} />
              ))}
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className='chat-messages'>
            <h3>
              <i className='far fa-hand-point-left' aria-hidden='true'></i>
              &nbsp;Please pick a user
            </h3>
          </div>
        )}
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
  postConversation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  postConversation,
})(Chat);

// export default Chat;
