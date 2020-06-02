import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
// import io from 'socket.io-client';

const Chat = ({
  getCurrentProfile,

  profile: {
    profile: { user, correspondances },
  },
  userlist,
}) => {
  console.log(correspondances);
  console.log(userlist);
  // const MessageItem = ({ item }) => {
  //   return (
  //     <div className='message'>
  //           <p className='meta'>
  //             User 1 <span>7:22pm</span>
  //           </p>
  //           <p className='text'>
  //             This is a sample chat in case I do not have time to complete this
  //             function. {/* {messageList} */}
  //           </p>
  //         </div>
  //     <NavLink to={`/profile/${thread.user}`} className='main-nav'>
  //       {thread.msg}
  //     </NavLink>
  //   );
  // };

  // // all working but need to refresh page : (
  // // Also need to put number of notifications after bell
  // const outputMessage = (item) => {
  //   if (user && user.notifications && user.notifications.length > 0) {
  //     user.notifications.forEach(function (thread) {
  //       if (thread.msg && thread.user) {
  //         console.log(thread.msg);
  //         toast(<MessageItem key={thread._id} thread={thread} />, {
  //           position: 'top-right',
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //       }
  //     });
  //     removeNotifications(user._id);
  //   }
  // };

  const [msg, setMsg] = useState('');
  const [messageList, setMessageList] = useState('');
  // const socket = io.connect('http://localhost:5000');
  useEffect(() => {
    // console.log(socket);
    // //Message from server
    // socket.on('message', (message) => {
    //   console.log(message);
    //   setMessageList(messageList);
    //   // outputMessage(message);
    // });
    getCurrentProfile();

    console.log(correspondances);
  }, [getCurrentProfile, messageList]);
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(msg);
    // Emit message to server
    // socket.emit('newChatMessage', msg);
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
            Users <i className='fas fa-user-friends'></i>
          </h3>
          <ul id='users'>
            {correspondances.length > 0 ? (
              correspondances.map((connection) => (
                <li key={connection._id}>{connection.user.toString()} </li>
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
          {/* <div className='photo-collection'>
            {messageList &&
              messageList.map((item) => (
                <MessageItem
                  key={photo._id}
                  photo={photo}
                  myProfile={profile}
                />
              ))}
          </div> */}
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
  getCurrentProfile: PropTypes.func.isRequired,

  profile: PropTypes.object.isRequired,
  userlist: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
  userlist: state.userlist,
});

export default connect(mapStateToProps, { getCurrentProfile })(Chat);

// export default Chat;
