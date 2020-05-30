import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfilePhotoItem from '../photos/ProfilePhotoItem';
// import ProfileExperience from './ProfileExperience';
// import ProfileEducation from './ProfileEducation';
// import ProfileGithub from './ProfileGithub';
import { getProfileById } from '../../actions/profile';
import {
  getMyPhotos,
  // getProfilePicById,
  getAllPhotosById,
} from '../../actions/photo';

const Profile = ({
  getMyPhotos,
  getProfileById,
  // getProfilePicById,
  getAllPhotosById,
  profile: { profile, loading },
  photo: { photos },
  auth,
  match,
}) => {
  useEffect(() => {
    console.log(match.params.id);
    getProfileById(match.params.id);
    // getProfilePicById(match.params.id);
    getAllPhotosById(match.params.id);
    // }, [getProfileById, match.params.id, getProfilePicById]);
  }, [getProfileById, match.params.id, getAllPhotosById]);
  let SquarePics;
  if (photos) {
    SquarePics = photos.filter((photo) => photo.isProfilePic == false);
  }

  // Runs immediately when profile mounts
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} photo={photos} />
            <ProfileAbout profile={profile} />
            <div className='profile-photo-collection'>
              {/* <div> */}
              {SquarePics &&
                SquarePics.map((photo) => (
                  <ProfilePhotoItem key={photo._id} photo={photo} />
                ))}
            </div>
            <Link to='/photos' className='btn btn-light'>
              Back to Matches
            </Link>
            {auth.isAuthenticated &&
              auth.loading === false &&
              auth.user._id === profile.user._id && (
                <Link to='/edit-profile' className='btn btn-dark'>
                  Edit Profile
                </Link>
              )}
            {/* <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary-T'>Experience</h2> */}
            {/* {(profile.experience & profile.experience.length > 0) ? ( */}
            {/* {profile.experience ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )} */}
            {/* </div> */}
            {/* <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary-T'>Education</h2>
              {profile.education & (profile.education.length > 0) ? (
              {profile.education ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithub gusername={profile.githubusername} />
            )} */}
          </div>
        </Fragment>
      )}
    </Fragment>
    // Spinner: UI does not render until data is loading
    // If user is authenticated and looks at his own profile, generate Edit Profile button
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  // getProfilePicById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  photo: state.photo,
});

export default connect(mapStateToProps, {
  getProfileById,
  getAllPhotosById,
  // getProfilePicById,
  getMyPhotos,
})(Profile);
