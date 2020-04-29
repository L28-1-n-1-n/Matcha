import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PhotoItem from '../photos/PhotoItem';
import { getMyPhotos } from '../../actions/photo';
import UploadAlertMessage from '../UploadAlertMessage';
import Progress from '../Progress';
import axios from 'axios';
// import { addPhoto } from '../../actions/photo';
import FileUpload from '../FileUpload';

const MyPhotos = ({ getMyPhotos, photo: { photos, loading } }) => {
  useEffect(() => {
    getMyPhotos();
  }, [getMyPhotos]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Manage Your Photos</h1>
      <div className='photo-collection'>
        {photos.map((photo) => (
          <PhotoItem key={photo._id} photo={photo} />
        ))}
      </div>

      <p className='lead'>
        <i className='fas fa-user'></i> Upload a maximum of 5 photos, and choose
        1 profile picture
      </p>
      <div className='container mt-4'>
        <h4 className='display-4 text-center mb-4'>
          <i className='fab fa-react' /> React File Upload
        </h4>

        <FileUpload />
      </div>
    </Fragment>
  );
};

MyPhotos.propTypes = {
  getMyPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, { getMyPhotos })(MyPhotos);
