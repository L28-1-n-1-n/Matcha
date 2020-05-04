import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfilePicById } from '../../actions/photo';
import Image from '../Image';
const ProfileTop = ({
  profile: {
    status,
    company,
    city,
    website,
    social,
    user: { _id, firstname, avatar },
  },
  getProfilePicById,
  photo: { photos },
  match,
  // getMyPhotos,
}) => {
  let myProfilePic;
  // useEffect(() => {
  //   getProfilePicById(_id);
  // }, [getProfilePicById, myProfilePic]);

  myProfilePic = photos.find((element) => element.isProfilePic == true);
  console.log(myProfilePic);

  return (
    <div className='profile-top bg-primary p-2'>
      {/* <img className='round-img my-1' src={myProfilePic} alt='' /> */}
      <div>
        {myProfilePic && myProfilePic.data && (
          <Image data={myProfilePic.data} />
        )}
      </div>
      <h1 className='large'>{firstname}</h1>
      <p className='lead'>
        {status} {company && <span> at {company}</span>}
      </p>
      <p>{city && <span>{city}</span>}</p>
      <div className='icons my-1'>
        {website && (
          <a href={website} target='_blank' rel='noopener noreferrer'>
            <i className='fas fa-globe fa-2x'></i>
          </a>
        )}
        {social && social.twitter && (
          <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-twitter fa-2x'></i>
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-facebook fa-2x'></i>
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-linkedin fa-2x'></i>
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-youtube fa-2x'></i>
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target='_blank' rel='noopener noreferrer'>
            <i className='fab fa-instagram fa-2x'></i>
          </a>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
  photo: PropTypes.object.isRequired,
  getProfilePicById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  photo: state.photo,
});

export default connect(mapStateToProps, { getProfilePicById })(ProfileTop);
