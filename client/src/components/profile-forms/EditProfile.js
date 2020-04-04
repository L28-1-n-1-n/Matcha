import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

// import Input from '@material-ui/core/Input';
// import TextField from '@material-ui/core/TextField';
// import Button from '@material-ui/core/Button';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(theme => ({
//   root: {
//     '& > *': {
//       margin: theme.spacing(1),
//       width: '25ch'
//     }
//   }
// }));

// const EditProfile = ({
//   profile: { profile, loading },
//   createProfile,
//   getCurrentProfile,
//   history
// }) => {
//   const [formData, setFormData] = useState({
//     company: '',
//     website: '',
//     location: '',
//     status: '',
//     githubusername: '',
//     skills: '',
//     bio: '',
//     twitter: '',
//     facebook: '',
//     linkedin: '',
//     youtube: '',
//     instagram: ''
//   });
//   const [displaySocialInputs, toggleSocialInputs] = useState(false);

//   useEffect(() => {
//     getCurrentProfile();
//     setFormData({
//       company: loading || !profile.company ? '' : profile.company,
//       website: loading || !profile.website ? '' : profile.website,
//       location: loading || !profile.location ? '' : profile.location,
//       status: loading || !profile.status ? '' : profile.status,
//       skills: loading || !profile.skills ? '' : profile.skills.join(','),
//       githubusername:
//         loading || !profile.githubusername ? '' : profile.githubusername,
//       bio: loading || !profile.bio ? '' : profile.bio,
//       twitter: loading || !profile.twitter ? '' : profile.twitter,
//       facebook: loading || !profile.facebook ? '' : profile.facebook,
//       linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
//       youtube: loading || !profile.youtube ? '' : profile.youtube,
//       instagram: loading || !profile.instagram ? '' : profile.instagram
//     });
//   }, [loading, getCurrentProfile]);

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};
const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  // const classes = useStyles();
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  // The prop to depend on is loading, setFormData will run when it is loaded
  const {
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
    instagram
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className='large text-primary'>Edit Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={e => onChange(e)}>
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
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
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
            onChange={e => onChange(e)}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='form-group'>
          <h1 className='small text-primary'>Upload photos</h1>
          <form action='/upload' method='POST' encType='multipart/form-data'>
            <div className='custom-file mb-3'>
              <input
                type='file'
                name='file'
                id='file'
                className='custom-file-input'
              />
              <label htmlFor='file' className='custom-file-label'>
                Choose FILE
              </label>
            </div>
            <input
              type='submit'
              value='Submit'
              className='btn btn-primary btn-block'
            />
          </form>
        </div>

        {/* 
        <div>
          <form className={classes.root} noValidate autoComplete='off'>
            <TextField id='standard-basic' label='Standard' />
            <TextField id='filled-basic' label='Filled' variant='filled' />
            <TextField
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
            />
          </form>
        </div>
        <div>
          <input
            accept='image/*'
            className={classes.input}
            style={{ display: 'none' }}
            id='raised-button-file'
            multiple
            type='file'
          />
          <label htmlFor='raised-button-file'>
            <Button
              variant='raised'
              component='span'
              className={classes.button}
            >
              Upload
            </Button>
          </label>
        </div>
         */}
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
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => onChange(e)}
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);

// EditProfile is wrapped in withRouter() to enable use of "history" action
