const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  // endpoint is '/me', not '/'
  try {
    // find user by its objectid
    // populate the user with name and avatar
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

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
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
      check('day', 'Date of birth is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      day,
      month,
      year,
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
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

    const profileFields = {
      user: req.user.id,
      company,
      location,
      // website: website === '' ? '' : normalize(website, { forceHttps: true }),
      website: website === '' ? '' : website,
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(',').map((skill) => ' ' + skill.trim()),
      status,
      githubusername,
    };

    // Build social object
    profileFields.social = {}; // Initialize empty object to avoid errors
    profileFields.bday = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;
    profileFields.bday.day = day;
    profileFields.bday.month = month;
    profileFields.bday.year = year;
    try {
      let profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

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
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
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
    }).populate('user', ['name', 'avatar']);
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

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
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

module.exports = router;
