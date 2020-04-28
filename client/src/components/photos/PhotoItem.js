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
} from '../../actions/photo';
import Image from '../Image';

const PhotoItem = ({
  addLike,
  removeLike,
  deletePhoto,
  makeProfilePic,
  auth,
  photo: {
    _id,
    isProfilePic,
    text,
    name,
    avatar,
    user,
    likes,
    comments,
    date,
    data,
  },
  showActions,
  history,
}) => (
  <div className='photo bg-white p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <img className='round-img' src={avatar} alt='' />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className='my-1'>{text}</p>
      {/* <img className='round-img' src={avatar} alt='' /> */}
      <Image data={data} />
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

          <button
            onClick={() => makeProfilePic(_id)}
            type='button'
            className='btn btn-primary'
          >
            Make Profile Picture
          </button>
          {/* To tell whether the current user is owner of this photo, if yes then display delete button */}
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePhoto(_id)}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

// default showActions to be true
PhotoItem.defaultProps = {
  showActions: true,
};

PhotoItem.propTypes = {
  photo: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired, // To tell whether the current user is owner of this photo, if yes then display delete button
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePhoto: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
  makeProfilePic: PropTypes.func.isRequired,
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
})(PhotoItem);

// export default connect(mapStateToProps, {
//   addLike,
//   removeLike,
//   deletePhoto,
//   addCaption,
// })(withRouter(PhotoItem));
