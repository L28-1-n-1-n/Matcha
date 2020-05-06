import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
export const DashboardActions = ({ profile: { user: _id } }) => {
  let userId = _id._id;

  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-cog text-primary'></i> Edit Profile
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fab fa-black-tie text-primary'></i> Add Experience
      </Link>
      <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary'></i> Add Education
      </Link>
      <Link to='/my-photos' className='btn btn-light'>
        <i className='fas fa-images text-primary'></i> My Photos
      </Link>
      {/* <Link to={'my-profile'} className='btn btn-light'> */}
      <Link to={`/profile/${userId}`} className='btn btn-light'>
        <i className='fas fa-user-circle text-primary'></i> View My Profile
      </Link>
    </div>
  );
};

export default DashboardActions;
