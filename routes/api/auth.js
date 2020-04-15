const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// const transporter = require('../../mail/mailer');

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

// @route   GET api/auth
// @desc    TEST route
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // array of errors
    }
    // See if user exists
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] }); // array of errors
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] }); // array of errors
      }
      console.log(user);
      console.log(user.confirmed);
      if (!user.confirmed) {
        return res.status(400).json({
          errors: [
            {
              msg: 'Please confirm your account via link sent to your email.',
            },
          ],
        });
      }
      // Get payload

      const payload = {
        user: {
          id: user.id,
        },
      };

      // Use payload and token to sign token
      //   jwt.sign(
      //     payload,
      //     config.get('jwtSecret'),
      //     { expiresIn: 360000 },
      //     (err, token) => {
      //       if (err) throw err;
      //       res.json({ token }); // callback : if no error, get token
      //     }
      //   );
      // } catch (err) {
      //   console.error(err.message);
      //   res.status(500).send('Server error');
      // }
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          const url = `http://localhost:3000/confirmation/${token}`;
          console.log('url is :');
          // console.log(url);
          const html = `Hello, <br />Thank you for signing up for Tindurr.<br /><br />Please click the link below to activate your account:<br /><a href=${url}>${url}</a>`;
          // console.log(url);
          console.log(html);
          var mailOptions = {
            from: 'no-reply.tindurr@outlook.com',
            to: user.email,
            subject: 'Confirm your Tindurr Account',
            html: html,
          };
          console.log(mailOptions);
          transporter.sendMail(
            // {
            //   from: 'no-reply@tindurr.com',
            //   to: user.email,
            //   subject: 'Confirm your Tindurr Account',
            //   html: html,
            // },
            mailOptions,
            (error, info) => {
              if (error) {
                return console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            }
          );
          res.json({ token }); // callback : if no error, get token
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
