import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';

const ChatLanding = () => {
  const [chosen, setChosen] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setChosen(true);
  };

  return (
    <Fragment>
      {chosen ? <Redirect to='/chat' /> : null}
      <div className='join-container'>
        <header className='join-header'>
          <h1>
            <i className='fas fa-smile'></i> ChatCord
          </h1>
        </header>
        <main className='join-main'>
          {/* <form action='chat.html'> */}
          <form className='form' onSubmit={(e) => onSubmit(e)}>
            <div className='form-control'>
              <label htmlFor='username'>Username</label>
              <input
                type='text'
                name='username'
                id='username'
                placeholder='Enter username...'
                required
              />
            </div>
            <div className='form-control'>
              <label htmlFor='room'>Room</label>
              <select name='room' id='room'>
                <option value='JavaScript'>JavaScript</option>
                <option value='Python'>Python</option>
                <option value='PHP'>PHP</option>
                <option value='C#'>C#</option>
                <option value='Ruby'>Ruby</option>
                <option value='Java'>Java</option>
              </select>
            </div>
            <button type='submit' className='btn'>
              Join Chat
            </button>
          </form>
        </main>
      </div>
    </Fragment>
  );
};

export default ChatLanding;
