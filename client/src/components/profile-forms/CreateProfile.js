import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { changeBDay } from '../../actions/profile';
import DatePicker from 'react-datepicker';
import Moment from 'react-moment';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
// import { usePosition } from './usePosition';
const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    // startDate: '',
    // bday: '',
    // bday: moment(Date.now, 'DD-MM-YYYY'),
    age: '',
    company: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    skills: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  // const [bday, setBDay] = useState(new Date());
  const {
    // startDate,
    // bday,
    age,
    company,
    website,
    location,
    status,
    githubusername,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // setFormData({
    //   ...formData,
    //   bday: moment(startDate).format('l').toString(),
    // });
    var result = moment(startDate).format('l').toString().split('/');
    console.log(result);
    console.log(result[0]);
    console.log(result[1]);
    console.log(result[2]);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      // bday: moment(startDate).format('l').toString().split('/')[0],
      // bday: moment(startDate).format('l').toString(),
      // bday: moment(startDate).month(),
    });
    console.log(formData);
    console.log(result);
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData);
    // console.log(usePosition);
    // const geo = navigator.geolocation;
    // console.log(geo);
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log('Latitude is :', position.coords.latitude);
      console.log('Longitude is :', position.coords.longitude);
    });
  };

  // setFormData({ ...formData, bday: startDate });
  // {
  //   if (typeof e === 'object') {
  //     if (e.target.name != bday) {
  //       setFormData({ ...formData, [e.target.name]: e.target.value });
  //     }
  //   } else {
  //     setFormData({ ...formData, bday: e });
  //   }
  // };
  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(startDate);

    // setFormData({
    //   ...formData,
    //   bday: moment(startDate).format('l').toString(),
    // });
    console.log(moment(startDate).format('l').toString());
    // console.log(bday);
    // setFormData({
    //   ...formData,
    //   bday: moment(startDate).format('l').toString(),
    //   // bday: 'LOL',
    // });

    console.log(formData);
    createProfile(formData, history);
  };
  return (
    <Fragment>
      <h1 class='large text-primary'>Create Your Profile</h1>
      <p class='lead'>
        <i class='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form class='form' onSubmit={(e) => onSubmit(e)}>
        <div class='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small class='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              setStartDate(date);
              setFormData({
                ...formData,
                // [e.target.name]: e.target.value,
                // bday: moment(startDate).format('l').toString().split('/')[0],
                bday: moment(date).format('l').toString(),
                // bday: moment(startDate).month(),
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
        </div>
        <div className='form-group'>
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
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
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
        </div>
        <div className='form-group'>
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
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        {/* <div className='container'>
          <div className='form-group'>
            <h1 class='small text-primary'>Create Your Profile</h1>
            <form action='/upload' method='POST' enctype='multipart/form-data'>
              <div class='custom-file mb-3'>
                <input
                  type='file'
                  name='file'
                  id='file'
                  class='custom-file-input'
                />
                <label for='file' class='custom-file-label'>
                  Choose file
                </label>
              </div>
              <input
                type='submit'
                value='Submit'
                class='btn btn-primary btn-block'
              />
            </form>
          </div>
        </div> */}

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
        {displaySocialInputs && (
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
        )}

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
};

export default connect(null, { createProfile })(withRouter(CreateProfile));

// CreateProfile is wrapped in withRouter() to enable use of "history" action
