import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    bio,
    tags,
    user: { firstname },
  },
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        {/* take First name only, not last name */}
        <h2 className='text-primary'>{firstname}'s Bio</h2>
        <p>{bio}</p>
        <div className='line'></div>
      </Fragment>
    )}

    <h2 className='text-primary'>Skill Set</h2>
    <div className='tags'>
      {/* map tags array to individual item for each skill */}
      {tags.map((tag, index) => (
        <div key={index} className='p-1'>
          <i className='fas fa-check'></i> {tag}
        </div>
      ))}
    </div>
  </div>
);
ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
