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
  const MessageItem = ({ item }) => {
    return (
      <div className='message'>
        <p className='meta'>
          {item.name} <span>{item.time}</span>
        </p>
        <p className='text'>{item.chatMsg}</p>
      </div>
      // <NavLink to={`/profile/${thread.user}`} className='main-nav'>
      //   {thread.msg}
      // </NavLink>
    );
  };

  const [inputMsg, setInputMsg] = useState('');
  const [messageList, setMessageList] = useState([]);
  const [targetSoc, setTargetSoc] = useState('');
  const [userList, setUserList] = useState([]);
  // const socket = io.connect('http://localhost:5000');
  // const findTargetSoc = (userID) => {
  //   let tmp = userlist.findIndex((x) => x.user === userID);
  //   if (tmp !== -1) {
  //     setTargetSoc(userlist[tmp].sid);
  //     console.log('targetSoc is ', targetSoc);
  //   }
  // };
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
      var now = new moment();
      setMessageList((prevState) => [
        ...prevState,
        { name: user.firstname, time: now.format('LLL'), chatMsg: message },
      ]);
      // outputMessage(message);
    });

    getCurrentProfile();
  }, [getCurrentProfile, messageList]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(inputMsg);
    // Emit message to server
    socket.emit('newChatMessage', inputMsg);
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
                  // onClick={() => findTargetSoc(connection.user)}
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
        {/* <div className='chat-messages'>
          <div className='message'>
            <p className='meta'>
              User 1 <span>7:22pm</span>
            </p>
            <p className='text'>
              This is a sample chat in case I do not have time to complete this
              function. 
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
        </div>  */}

        <div className='chat-messages'>
          {messageList &&
            messageList.map((item) => (
              <MessageItem key={item.time} item={item} />
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
