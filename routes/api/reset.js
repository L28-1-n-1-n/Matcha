const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const config = require('config');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
// @route   POST api/confirmation
// @desc    Verify user registration token
// @access  Public
// router.post('/', async (req, res) => {
//   try {
//     const { token, password } = req.body;
//     const user = await User.findOne({ token: token }).select('-password');
//     if (!user) {
//       return res.status(404).json({ msg: 'Token not valid' });
//     }
//     res.json(user);
//   } catch (err) {
//     console.error(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Token not valid' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

router.post(
  '/',
  //   [check('email', 'Please include a valid email').isEmail()],
  // [check('password', 'Password is required').exists()],
  async (req, res) => {
    try {
      //   const errors = validationResult(req);

      //   if (!errors.isEmpty()) {
      //     return res.status(400).json({ errors: errors.array() }); // array of errors
      //   }

      const { token, password } = req.body;
      console.log(token);

      // See if user exists

      // let user = await User.findOne({ token: token }).select('-password');
      let user = await User.findOne({ token: token });

      if (!user) {
        return res.status(404).json({ errors: [{ msg: 'Token not valid' }] });
      }

      // new from below
      console.log(user);

      // Get payload
      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user in Database
      await user.save();
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Token not valid' });
      }
      res.status(500).send('Server Error');
    }
  }
);
module.exports = router;
