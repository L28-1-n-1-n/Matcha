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
import { setAlert } from '../../actions/alert';
import { max } from 'moment';
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
  const [rankAge, setRankAge] = useState('');
  const [rankFame, setRankFame] = useState('');
  const [rankDistance, setRankDistance] = useState('');
  const [rankMaxCommonTags, setRankMaxCommonTags] = useState('');
  useEffect(() => {
    getCurrentProfile();

    getFilteredPhotos();
  }, [
    getFilteredPhotos,
    getCurrentProfile,
    rankAge,
    rankFame,
    rankDistance,
    rankMaxCommonTags,
  ]);
  console.log(photos);

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
  const ageOlder = () => {
    setRankAge('High');
  };
  const fameLess = () => {
    setRankFame('Low');
  };
  const distanceHigher = () => {
    setRankDistance('High');
  };
  const maxCommonTagsLower = () => {
    setRankMaxCommonTags('Low');
  };
  if (rankAge == 'High') {
    if (ProfilePics) {
      ProfilePics.sort((a, b) => (a.profile.age > b.profile.age ? -1 : 1));
    }
  }
  if (rankFame == 'Low') {
    if (ProfilePics) {
      ProfilePics.sort((a, b) => (a.profile.fame > b.profile.fame ? 1 : -1));
    }
  }
  if (rankDistance == 'High') {
    if (ProfilePics) {
      ProfilePics.sort((a, b) =>
        a.profile.distance > b.profile.distance ? -1 : 1
      );
    }
  }
  if (rankMaxCommonTags == 'Low') {
    if (ProfilePics) {
      ProfilePics.sort((a, b) =>
        a.profile.maxCommonTags > b.profile.maxCommonTags ? -1 : 1
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
          <div className='my-2'>
            <button className='btn btn-light' onClick={() => ageOlder()}>
              <i className='fas fa-user-minus'></i> Older First
            </button>
          </div>
          <div className='my-2'>
            <button className='btn btn-light' onClick={() => fameLess()}>
              <i className='fas fa-user-minus'></i> Lower Fame First
            </button>
          </div>
          <div className='my-2'>
            <button className='btn btn-light' onClick={() => distanceHigher()}>
              <i className='fas fa-user-minus'></i> Higher Distance First
            </button>
          </div>
          <div className='my-2'>
            <button
              className='btn btn-light'
              onClick={() => maxCommonTagsLower()}
            >
              <i className='fas fa-user-minus'></i> Less Common Tags First
            </button>
          </div>
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
