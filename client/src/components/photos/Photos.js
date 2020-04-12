import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PhotoItem from './PhotoItem';
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
      <h1 className='large text-primary'>Photos</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome to the community
      </p>
      {/* <PhotoForm /> */}
      <div className='photos'>
        {photos.map((photo) => (
          <PhotoItem key={photo._id} photo={photo} />
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
