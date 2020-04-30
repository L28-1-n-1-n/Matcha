import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GalleryPhotoItem from './GalleryPhotoItem';
// import PhotoForm from './PhotoForm';
import { getPhotos } from '../../actions/photo';

const Photos = ({ getPhotos, photo: { photos, loading } }) => {
  useEffect(() => {
    getPhotos();
  }, [getPhotos]);
  //   const [formData, setFormData] = useState({
  //     company: '',
  //     title: '',
  //     location: '',
  //     from: '',
  //     to: '',
  //     current: false,
  //     description: '',
  //   });
  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Matches</h1>
      <p className='lead'>
        <i className='fas fa-heartbeat' /> Based on your preferences, here are
        your matches
      </p>
      {/* <PhotoForm /> */}
      <div className='photo-collection'>
        {photos.map((photo) => (
          <GalleryPhotoItem key={photo._id} photo={photo} />
        ))}
      </div>
    </Fragment>
  );
};

Photos.propTypes = {
  getPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, { getPhotos })(Photos);
