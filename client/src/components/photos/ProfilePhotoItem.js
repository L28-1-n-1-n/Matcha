import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import {
  addLike,
  removeLike,
  addLikedBy,
  makeProfilePic,
} from '../../actions/photo';
import Image from '../Image';

const ProfilePhotoItem = ({
  addLike,
  removeLike,
  addLikedBy,
  photo: { _id, isProfilePic, firstname, user, likes, date, data, profile },
  showActions,
}) => {
  return (
    <div className='profile-all-img bg-white p-1 my-1'>
      <div>
        <Image data={data} />
      </div>
      <div>
        <p className='profile-photo-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <Fragment>
            <button
              onClick={() => {
                addLike(_id);
                addLikedBy(_id);
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
          </Fragment>
        )}
      </div>
    </div>
  );
};
// default showActions to be true
ProfilePhotoItem.defaultProps = {
  showActions: true,
};

ProfilePhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  addLikedBy: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  makeProfilePic: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(null, {
  addLike,
  addLikedBy,
  removeLike,
  makeProfilePic,
})(ProfilePhotoItem);
