import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
// import Experience from './Experience';
// import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

// pull profile and loading state out of profile
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user }, // pull user from auth
  profile: { profile, loading },
  justCreatedProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  console.log(user);
  if (justCreatedProfile) {
    return <Redirect to='/my-photos' />;
  }

  return loading && profile == null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Welcome {user && user.firstname}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          {/* <Experience experience={profile.experience} />
          <Education education={profile.education} /> */}

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user-minus'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
    // check if user exists before displaying name
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  justCreatedProfile: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  justCreatedProfile: state.auth.justCreatedProfile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
