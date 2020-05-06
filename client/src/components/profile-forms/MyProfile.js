import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import ProfileExperience from '../profile/ProfileExperience';
import ProfileEducation from '../profile/ProfileEducation';
import ProfileGithub from '../profile/ProfileGithub';
import { getProfileById } from '../../actions/profile';
import { getCurrentProfile } from '../../actions/profile';
import { getMyPhotos } from '../../actions/photo';
const Profile = ({
  getMyPhotos,
  getCurrentProfile,
  getProfileById,
  profile: { profile, loading },
  photo: { photos },
  auth,
  match,
}) => {
  useEffect(() => {
    //     getProfileById(match.params.id);
    //   }, [getProfileById, match.params.id]);
    getMyPhotos();
    getCurrentProfile();
  }, [getCurrentProfile, getMyPhotos]);
  // Runs immediately when profile mounts
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back to Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary-T'>Experience</h2>
              {/* {(profile.experience & profile.experience.length > 0) ? ( */}
              {profile.experience ? (
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
              )}
            </div>
            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary-T'>Education</h2>
              {/* {profile.education & (profile.education.length > 0) ? ( */}
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
            )}
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
  getCurrentProfile: PropTypes.func.isRequired,
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
  getCurrentProfile,
  getProfileById,
  getMyPhotos,
})(Profile);
