import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { forceRefresh } from '../../actions/socClient';
import { disconnect } from '../../actions/profile';
import { connect } from 'react-redux';
import { block } from '../../actions/profile';

import {
  addLike,
  addLikedBy,
  addNotification,
  removeLike,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
} from '../../actions/photo';
import Image from '../Image';

const ConnectedPhotoItem = ({
  addLike,
  addLikedBy,
  addNotification,
  removeLike,
  myProfile,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
  forceRefresh,
  disconnect,
  block,
  auth,
  photo: {
    _id,
    isProfilePic,
    text,
    firstname,
    gender,
    user,
    likes,
    comments,
    date,
    data,
    profile,
  },
  showActions,
  history,
}) => {
  let age;
  if (profile.bday) {
    const findAge = () => {
      var dateObj = new Date();
      age = dateObj.getUTCFullYear() - profile.bday.year;
      var month = dateObj.getUTCMonth() + 1 - profile.bday.month; //months from 1-12
      var day = dateObj.getUTCDate() - profile.bday.day;
      return (age = month < 0 ? age - 1 : day < 0 ? age - 1 : age);
    };
    findAge();
  }
  console.log('fame is ', profile);
  console.log('user id is', profile.user);
  return (
    <div className='photo bg-white p-1 my-1'>
      <div>
        <Link
          to={`/profile/${profile.user}`}
          className='btn btn-primary'
          onClick={() => {
            console.log('first on click');
            console.log(profile._id);
            console.log(myProfile.user._id);
            addClickedBy(profile._id, myProfile.user._id);
            forceRefresh(profile.user);
          }}
        >
          <Image data={data} />
        </Link>
      </div>
      <div>
        <p className='my-1'>
          {firstname}
          {', '}
          {profile.gender}
          {', '}
          {age}
        </p>
        {profile && profile.location && (
          <p className='my-1'>{profile.location.city}</p>
        )}
        <button type='button' className='btn btn-light'>
          <i className='fas fa-fire-alt' />{' '}
          <span>
            {profile.checkedOutBy &&
              profile.checkedOutBy.length + profile.likedBy.length > 0 && (
                <span>
                  {profile.checkedOutBy.length + profile.likedBy.length}
                </span>
              )}
          </span>
        </button>
        {/* <img className='round-img' src={avatar} alt='' /> */}

        <p className='photo-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => {
                addLike(_id);
                addLikedBy(_id);

                forceRefresh(profile.user);
                // addNotification(_id);
              }}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-up' />{' '}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type='button'
              className='btn btn-light'
            >
              <i className='fas fa-thumbs-down' />
            </button>
            <button
              onClick={() => block(profile.user)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-ban' /> {'Block'}
            </button>
            <button
              onClick={() => disconnect(profile.user)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' /> {'Disconnect with '}
              {firstname}
            </button>

            {/* To tell whether the current user is owner of this photo, if yes then display delete button */}
            {/* {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePhoto(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )} */}
          </Fragment>
        )}
      </div>
    </div>
  );
};
// default showActions to be true
ConnectedPhotoItem.defaultProps = {
  showActions: true,
};

ConnectedPhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired, // To tell whether the current user is owner of this photo, if yes then display delete button
  addLike: PropTypes.func.isRequired,
  addLikedBy: PropTypes.func.isRequired,
  addNotification: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  addClickedBy: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  makeProfilePic: PropTypes.func.isRequired,
  forceRefresh: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  block: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // photo: state.photo,
});

export default connect(mapStateToProps, {
  addLike,
  addLikedBy,
  addNotification,
  removeLike,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
  forceRefresh,
  disconnect,
  block,
})(ConnectedPhotoItem);

// export default connect(mapStateToProps, {
//   addLike,
//   removeLike,
//   deletePhoto,
//   addCaption,
// })(withRouter(ConnectedPhotoItem));
