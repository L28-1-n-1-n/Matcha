import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfilePicById } from '../../actions/photo';
// import { useBeforeFirstRender } from '../../useBeforeFirstRender';
import Image from '../Image';
const ProfileTop = ({
  profile: {
    bday,
    location: { city },
    user: { _id, firstname, lastname },
  },
  getProfilePicById,
  photo: { photos },
  // getMyPhotos,
}) => {
  let myProfilePic;
  let age;
  if (bday) {
    const findAge = () => {
      var dateObj = new Date();
      age = dateObj.getUTCFullYear() - bday.year;
      var month = dateObj.getUTCMonth() + 1 - bday.month; //months from 1-12
      var day = dateObj.getUTCDate() - bday.day;
      return (age = month < 0 ? age - 1 : day < 0 ? age - 1 : age);
    };
    findAge();
  }
  // useBeforeFirstRender(() => {
  //   console.log('Do stuff here');
  //   getProfilePicById(_id);
  // });

  useEffect(() => {
    getProfilePicById(_id);
    myProfilePic = photos.find(
      (element) => element.isProfilePic == true && element.user == _id
    );
  }, [getProfilePicById, myProfilePic]);

  myProfilePic = photos.find(
    (element) => element.isProfilePic == true && element.user == _id
  );

  return (
    <div className='profile-top bg-primary p-2'>
      {/* <img className='round-img my-1' src={myProfilePic} alt='' /> */}
      <div>
        {myProfilePic && myProfilePic.data && (
          <Image data={myProfilePic.data} />
        )}
      </div>
      <h1 className='large'>
        {firstname}
        {'  '}
        {lastname}
        {',  '}
        {age}
      </h1>

      <p className='lead'>{city && <span>{city}</span>}</p>
      {/* <div className='icons my-1'>
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
      </div> */}
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
  // profile: state.profile,
});

export default connect(mapStateToProps, { getProfilePicById })(ProfileTop);
