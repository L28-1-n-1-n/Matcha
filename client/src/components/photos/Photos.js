import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import GalleryPhotoItem from './GalleryPhotoItem';
// import PhotoForm from './PhotoForm';
// import { getPhotos } from '../../actions/photo';
import { getFilteredPhotos } from '../../actions/photo';
import { getCurrentProfile } from '../../actions/profile';
import { addClickedBy } from '../../actions/photo';
// import { useBeforeFirstRender } from '../../useBeforeFirstRender';
const Photos = ({
  getCurrentProfile,
  // getPhotos,
  getFilteredPhotos,
  photo: { photos, loading },
  profile: { profile },
}) => {
  // useBeforeFirstRender(() => {
  //   console.log('Do stuff here');
  //   getCurrentProfile();
  //   getPhotos();
  // });
  let ProfilePics;
  useEffect(() => {
    getCurrentProfile();
    // getPhotos();
    getFilteredPhotos();
    // }, [getPhotos, getCurrentProfile]);
  }, [getFilteredPhotos, getCurrentProfile]);
  console.log(photos);
  // let ProfilePics;
  // Get profile pics of other users, excluding my own
  if (photos) {
    ProfilePics = photos.filter((photo) => photo.profile);
  }

  if (ProfilePics && profile) {
    if (profile.interestedGender == 'Female') {
      ProfilePics = ProfilePics.filter(
        (photo) =>
          photo.profile.gender !== 'Male' &&
          (photo.profile.interestedGender == 'Both' ||
            photo.profile.interestedGender == profile.gender)
      );
    } else if (profile.interestedGender == 'Male') {
      ProfilePics = ProfilePics.filter(
        (photo) =>
          photo.profile.gender !== 'Female' &&
          (photo.profile.interestedGender == 'Both' ||
            photo.profile.interestedGender == profile.gender)
      );
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className='large text-primary-T'>Matches</h1>
          <p className='lead'>
            <i className='fas fa-heartbeat' /> Based on your preferences, here
            are your matches
          </p>
          {/* <PhotoForm /> */}
          <div className='photo-collection'>
            {ProfilePics &&
              ProfilePics.map((photo) => (
                <GalleryPhotoItem
                  key={photo._id}
                  photo={photo}
                  myProfile={profile}
                />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Photos.propTypes = {
  // getPhotos: PropTypes.func.isRequired,
  getFilteredPhotos: PropTypes.func.isRequired,
  photo: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getFilteredPhotos,
  getCurrentProfile,
})(Photos);
