import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';

import { connect } from 'react-redux';

import {
  addLike,
  removeLike,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
} from '../../actions/photo';
import Image from '../Image';

const GalleryPhotoItem = ({
  addLike,
  removeLike,
  myProfile,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
  auth,
  photo: {
    _id,
    isProfilePic,
    text,
    firstname,
    avatar,
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
          }}
        >
          <Image data={data} />
        </Link>
      </div>
      <div>
        <p className='my-1'>
          {firstname}
          {', '}
          {age}
        </p>
        {profile && profile.location && (
          <p className='my-1'>{profile.location.city}</p>
        )}
        {/* <img className='round-img' src={avatar} alt='' /> */}

        <p className='photo-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
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
GalleryPhotoItem.defaultProps = {
  showActions: true,
};

GalleryPhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired, // To tell whether the current user is owner of this photo, if yes then display delete button
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  addClickedBy: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  makeProfilePic: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  // photo: state.photo,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePhoto,
  makeProfilePic,
  addClickedBy,
})(GalleryPhotoItem);

// export default connect(mapStateToProps, {
//   addLike,
//   removeLike,
//   deletePhoto,
//   addCaption,
// })(withRouter(GalleryPhotoItem));
