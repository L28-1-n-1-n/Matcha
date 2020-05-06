import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  // pull them out so we can use these variables directly
  profile: {
    user: { _id, firstname, avatar },
    status,
    company,
    city,
    tags,
  },
}) => {
  return (
    <div className='profile bg-light'>
      <img src={avatar} alt='' className='round-img' />
      <div>
        <h2>{firstname}</h2>
        {/* if company exists, display company */}
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className='my-1'>{city && <span>{city}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      <ul>
        {/* maximum of 4 skills */}
        {tags.slice(0, 4).map((tag, index) => (
          <li key={index} className='text-primary-T'>
            <i className='fas fa-check'></i>
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profiles: PropTypes.object.isRequired,
};

export default ProfileItem;
