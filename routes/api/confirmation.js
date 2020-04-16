const express = require('express');
const router = express.Router();
const User = require('../../models/User');

// @route   GET api/confirmation/:token
// @desc    Verify user registration token
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { token } = req.body;
    console.log('token in router is');
    console.log(token);
    const user = await User.findOne({ token: token }).select('-password');
    console.log('now confirming user');
    console.log(user);
    if (!user) {
      res.flash('error', 'No user found');
      res.redicrect('/');
    }
    res.json(user);
    user.confirmed = true;
    await user.save();
    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
