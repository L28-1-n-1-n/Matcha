const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// Setting up nodemailer
const nodemailer = require('nodemailer');
const MAILER_USER = config.get('mailerUser');
const MAILER_PASS = config.get('mailerPass');
const transporter = nodemailer.createTransport({
  service: 'Outlook365',
  auth: {
    user: MAILER_USER,
    pass: MAILER_PASS,
  },
});

// @route   POST api/users
// @desc    Register users
// @access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // array of errors
    }

    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] }); // array of errors
      }
      // See if user exists

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });

      // Create User
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user in Database
      await user.save();

      // new from below
      console.log(user);
      console.log(user.confirmed);

      // new above

      // Get payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Use payload and token to sign token
      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   { expiresIn: 360000 },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({ token }); // callback : if no error, get token
      //   }
      // );

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          user.token = token;
          user.save();
          const url = `http://localhost:3000/confirmation/${token}`;
          const html = `Hello, <br />Thank you for signing up for Tindurr.<br /><br />Please click the link below to activate your account:<br /><a href=${url}>${url}</a>`;
          console.log(html);
          var mailOptions = {
            from: 'no-reply.tindurr@outlook.com',
            to: user.email,
            subject: 'Confirm your Tindurr Account',
            html: html,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
          res.json({ token }); // callback : if no error, get token
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   GET api/users/confirmation/:token
// @desc    Verify user registration token
// @access  Public
// router.get('/confirmation/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({ verification_token: token }).select(
//       '-password'
//     );
//     if (!user) {
//       res.flash('error', 'No user found');
//       res.redicrect('/');
//     }
//     res.json(user);
//     user.confirmed = true;
//     await user.save();
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
