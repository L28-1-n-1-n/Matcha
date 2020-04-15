const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route   GET api/confirmation/:token
// @desc    Verify user registration token
// @access  Public
router.get('/:token', async (req, res) => {
  try {
    const user = await User.findOne({ verification_token: token }).select(
      '-password'
    );
    if (!user) {
      res.flash('error', 'No user found');
      res.redicrect('/');
    }
    res.json(user);
    user.confirmed = true;
    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
