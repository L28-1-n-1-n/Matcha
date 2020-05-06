const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const publicIp = require('public-ip');
const ipLocation = require('iplocation');
// for getting client-side ip, won't work here since it is localhost.
// See router.get('/cip', auth, ... at the end of this file
const requestIp = require('request-ip');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  // endpoint is '/me', not '/'
  try {
    // find user by its objectid
    // populate the user with firstname and avatar
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['firstname', 'lastname', 'avatar']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: ' There is no profile for this user' });
    }
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update user's profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('gender', 'Gender is required').isIn([
        'Male',
        'Female',
        'Non-Binary',
      ]),
      check('bday', 'Date of birth is required').not().isEmpty(),
      check('bday.day', 'Date of birth is required')
        .not()
        .isIn(['Invalid date', 'undefined', NaN]),
      check(
        'interestedGender',
        'Please specify the gender/s/ you are interested in.'
      ).isIn(['Male', 'Female', 'Both']),
      check('bio', 'Please fill in Short Bio').not().isEmpty(),
      check('tags', 'Enter a list of interests').not().isEmpty(),
      check(
        'bio',
        'Please make sure your bio is less than 100 characters.'
      ).isLength({ max: 200 }),
      check('firstname', 'Please fill in first name').not().isEmpty(),
      check('lastname', 'Please fill in last name').not().isEmpty(),
      check('email', 'Please ensure email is in correct format').isEmail(),
      check('firstname', 'First name is too long').isLength({ max: 15 }),
      check('lastname', 'Last name is too long').isLength({ max: 15 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      // day,
      // month,
      // year,
      bday,
      pre_latitude,
      pre_longitude,
      gender,
      interestedGender,
      tags,
      bio,
      // firstname,
      // lastname,
      // email,
      // company,
      // website,
      // skills,
      // status,
      // githubusername,
      // youtube,
      // twitter,
      // instagram,
      // linkedin,
      // facebook,
    } = req.body;

    // //Build profile object
    // const profileFields = {}; // Initialize to empty object
    // profileFields.user = req.user.id;
    // if (company) profileFields.company = company;
    // if (website) profileFields.website = website;
    // if (location) profileFields.location = location;
    // if (bio) profileFields.bio = bio;
    // if (status) profileFields.status = status;
    // if (githubusername) profileFields.githubusername = githubusername;
    // if (skills) {
    //   profileFields.skills = skills.split(',').map(skill => skill.trim()); // parse using ',' as delimiter, trim all spaces and put into an array
    // }
    let latitude;
    let longitude;
    let city;
    let country;

    const profileFields = {
      user: req.user.id,
      bday,
      gender,
      interestedGender,
      bio,
      tags: Array.isArray(tags)
        ? tags
        : tags.split(',').map((tag) => ' ' + tag.trim()),
      // status,
      // company,
      // // website: website === '' ? '' : normalize(website, { forceHttps: true }),
      // website: website === '' ? '' : website,
      // skills: Array.isArray(skills)
      //   ? skills
      //   : skills.split(',').map((skill) => ' ' + skill.trim()),
      // status,
      // githubusername,
    };

    // const userFields = {
    //   _id: req.user.id,
    //   firstname: firstname,
    //   lastname: lastname,
    //   email: email,
    // }
    try {
      // This only works if user has ipv4, not ipv6, as ipLocation only works with ipv4
      const ipresult = await publicIp.v4();
      const georesult = await ipLocation(ipresult);
      city = georesult.city;
      country = georesult.country.name;

      latitude = pre_latitude == 200 ? georesult.latitude : pre_latitude;
      longitude = pre_longitude == 200 ? georesult.longitude : pre_longitude;
    } catch (error) {
      console.log('location determination by IP rejected');
    }

    // Build social, bday, location object
    // Initialize empty object to avoid errors
    // profileFields.social = {};
    // profileFields.bday = {};
    profileFields.location = {};

    // if (youtube) profileFields.social.youtube = youtube;
    // if (twitter) profileFields.social.twitter = twitter;
    // if (facebook) profileFields.social.facebook = facebook;
    // if (linkedin) profileFields.social.linkedin = linkedin;
    // if (instagram) profileFields.social.instagram = instagram;
    // if (day) profileFields.bday.day = day;
    // if (month) profileFields.bday.month = month;
    // if (year) profileFields.bday.year = year;
    if (latitude) profileFields.location.latitude = latitude;
    if (longitude) profileFields.location.longitude = longitude;
    if (city) profileFields.location.city = city;
    if (country) profileFields.location.country = country;

    try {
      let profile = await Profile.findOne({ user: req.user.id });
      let user = await User.findOne({ user: req.user.id });
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }
      // if (user) {
      //   user = await User.findOneAndUpdate(
      //     { _id: req.user.id },
      //      { $set: userFields},
      //      { new: true }
      //   );
      //   return res.json(user);
      // }

      // If profile not found, create new one
      profile = new Profile(profileFields); // profile is an instance of the model Profile, profileFields is ProfileSchema

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', [
      'firstname',
      'lastname',
      'avatar',
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id // get user by userid, not profileid
// @desc    Get profile by user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['firstname', 'lastname', 'avatar']);
    if (!profile)
      return res.status(400).json({ msg: 'There is no profile for this user' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' }); // display message for non-valid userid
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts before removing their profile and account
    await Post.deleteMany({ user: req.user.id });

    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private

router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove indexs
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private

router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From date is required and needs to be from the past')
        .not()
        .isEmpty()
        .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/education/:edu_id
// @desc    Delete education from profile
// @access  Private

router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove indexs
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/github/:gusername
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:gusername', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.gusername
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);

      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    console.error(err.message);
    res.stastus(500).send('Server Error');
  }
});

// example use of getting Client-side IP address
// The result is not incorporated in the database since it is localhost
// Instead the server-side ip address is used to determine user location, on this particular occation only
// router.get('/cip', async (req, res) => {
//   try {
//     const ip = req.clientIp;
//     console.log(ip);
//     res.end(ip);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
