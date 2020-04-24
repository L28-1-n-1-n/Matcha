import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { getPhotos } from '../../actions/photo';
import { addPhoto } from '../../actions/photo';
import FileUpload from '../FileUpload';

const initialState = {
  name: '',
  size: '',
  type: '',
};
const EditPhoto = ({
  photo: { photo, loading },
  // profile: { profile, loading },
  createProfile,
  // getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);

  // const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // const classes = useStyles();
  useEffect(() => {
    // if (!profile) getCurrentProfile();
    if (!photo) getPhotos();
    // need to write the equivalent for !photo, otherwise it will throw error on photo: {photo} since it is undefined to begin with
    if (!loading) {
      // const profileData = { ...initialState };
      const photoData = { ...initialState };
      // for (const key in profile) {
      //   if (key in profileData) profileData[key] = profile[key];
      // }
      for (const photokey in photo) {
        if (photokey in photoData) photoData[photokey] = photo[photokey];
      }
      // for (const key in profile.social) {
      //   if (key in profileData) profileData[key] = profile.social[key];
      // }
      // setFormData(profileData);
      setFormData(photoData);
    }
    // }, [loading, getCurrentProfile, getPhotos, photo, profile]);
  }, [loading, getPhotos, photo]);

  // The prop to depend on is loading, setFormData will run when it is loaded
  const { name, size, type } = formData;

  const onChange = (e) =>
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    {
      console.log(e.target.files[0]);
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(e.target.files[0]);
    // createProfile(formData, history, true);
    const data = new FormData();
    data.append('file', e.target.files[0]);
    // for (const photokey2 in e.target.files[0]) {
    //   if (photokey2 in e.target.files[0])
    //     data.append(photokey2, e.target.files[0][photokey2]);
    // }
    // addPhoto({ formData });
    console.log('data is');
    console.log(data);
    addPhoto(data);
    console.log('done');
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Manage Your Photos</h1>
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
      {/* <form className='form' onSubmit={(e) => onSubmit(e)}> */}
      {/* <div className='form-group'>
        <h1 className='small text-primary'>Upload photos</h1>
        <form action='/upload' method='POST' encType='multipart/form-data'>
          <div className='custom-file mb-3'>
            <input
              type='file'
              name='file'
              id='file'
              className='custom-file-input'
            />
            <label htmlFor='file' className='custom-file-label'>
              Choose FILE
            </label>
          </div>
          <input
            type='submit'
            value='Submit'
            className='btn btn-primary btn-block'
          />
        </form>
      </div> */}
      {/* </form> */}

      {/* <form
        action='../../../../api/photos'
        method='POST'
        encType='multipart/form-data'
      > */}
      {/* <div className='form-group files'> */}
      {/* <form onSubmit={onSubmit}>
        <div className='custom-file mb-3'>
          <label>Upload your photo</label>
          <input
            type='file'
            name='file'
            id='file'
            className='custom-file-input'
            onChange={onChange}
          />
        </div>
        <input
          type='submit'
          value='Submit'
          className='btn btn-primary btn-block'
        />
        {/* <button
          type='button'
          className='btn btn-success btn-block'
          onClick={onClick}
        >
         Upload
        </button>
      </form> */}
    </Fragment>
  );
};

EditPhoto.propTypes = {
  // createProfile: PropTypes.func.isRequired,
  // getCurrentProfile: PropTypes.func.isRequired,
  // profile: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  // profile: state.profile
});

export default connect(mapStateToProps, {
  // createProfile,
  // getCurrentProfile,
  getPhotos,
})(withRouter(EditPhoto));

// export default connect(mapStateToProps, {})(withRouter(EditPhoto));
// EditProfile is wrapped in withRouter() to enable use of "history" action
