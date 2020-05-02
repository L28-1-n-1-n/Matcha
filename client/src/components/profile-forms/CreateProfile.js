import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { detailedGeo, createProfile } from '../../actions/profile';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    gender: '',
    interestedGender: '',
    bio: '',
    age: '',
    tags: '',
    // company: '',
    // website: '',
    // status: '',
    // githubusername: '',
    // skills: '',
    // twitter: '',
    // facebook: '',
    // linkedin: '',
    // youtube: '',
    // instagram: '',
  });
  // const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const {
    gender,
    interestedGender,
    bio,
    age,
    tags,
    // company,
    // website,
    // status,
    // githubusername,
    // skills,
    // twitter,
    // facebook,
    // linkedin,
    // youtube,
    // instagram,
  } = formData;
  useEffect(() => {
    // var lat;
    // var long;
    // pre-set latitude and longitude to an out-of-range value 200
    // Normally latitude and longitude are +/-90 and +/-180 respectively
    // This value (200) will be replaced by GPS values if navigator.geolocation is allowed by user
    // Otherwise thier value will be updated in the server using guesses by ip address
    // Please see below (towards the end of useEffect()) on arrangements for guessing geolocation by ip address
    setFormData({
      ...formData,
      pre_latitude: 200,
      pre_longitude: 200,
    });
    // Replace error value with latitude and longitude obtained by GPS if user allows navigator.geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // lat = position.coords.latitude;
          // long = position.coords.longitude;

          setFormData({
            ...formData,
            pre_latitude: position.coords.latitude,
            pre_longitude: position.coords.longitude,
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.log('User denied the request for Geolocation.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.log('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              console.log('The request to get user location timed out.');
              break;
            case error.UNKNOWN_ERROR:
              console.log('An unknown error occurred.');
              break;
          }
        }
      );
    }

    // In this project, the built-in method to obtina IP gets the server-side IP
    // This is because the client is localhost, so under the circumstances of this project, the user's physical location is given by the server IP
    // However, I've also built the code that would have gotten the client-side IP, although this was not incorporated into the database
    // Uncomment below to get client-side IP, which will be a reserved IP since client is localhost
    // detailedGeo();
    // Also uncomment detailedGeo() in ../../actions/profile.js
    // Also uncomment router.get('/cip', auth, ... at the end of the file ../../../routes/api/profile.js
  }, []);

  let result = moment(startDate).format('l').toString().split('/');
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      day: result[0],
      month: result[1],
      year: result[2],
    });
    console.log(formData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>Tell us more about you
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='gender' value={gender} onChange={(e) => onChange(e)}>
            <option value='0'>* Select gender</option>
            <option value='Male'>Male</option>
            <option value='Female'>Female</option>
          </select>
        </div>
        <div className='form-group'>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              result = moment(date).format('l').toString().split('/');

              setFormData({
                ...formData,

                day: result[0],
                month: result[1],
                year: result[2],
              });

              console.log('we are here');
              console.log(moment(date).format('l').toString());
              console.log(formData);
            }}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode='select'
          />
          <small className='form-text'>* Date of Birth</small>
        </div>
        <div className='form-group'>
          <select
            name='interestedGender'
            value={interestedGender}
            onChange={(e) => onChange(e)}
          >
            <option value='0'>* I am interested in ...</option>
            <option value='Male'>Men</option>
            <option value='Female'>Women</option>
            <option value='Both'>Both</option>
          </select>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='* A few sentences about yourself [Max 200 characters] '
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>
            Please write a short bio of yourself
          </small>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* My Interests'
            name='tags'
            value={tags}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please enter a list of your interests separated by commas (eg.
            Hiking,Maths,Gardening,Pokemon)
          </small>
        </div>

        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div> */}
        {/* 
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div> */}
        {/* <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {/* only show when toggle button is pushed */}
        {/* {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )} */}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  detailedGeo: PropTypes.func.isRequired,
};

export default connect(null, { createProfile, detailedGeo })(
  withRouter(CreateProfile, detailedGeo)
);

// CreateProfile is wrapped in withRouter() to enable use of "history" action
