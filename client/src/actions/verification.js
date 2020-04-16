import axios from 'axios';
import { setAlert } from './alert';
import { EMAIL_VERIFIED, VERIFICATION_ERROR } from './types';

// Verify user's email
export const verifyEmail = (token) => async (dispatch) => {
  try {
    console.log('token is');
    console.log(token);
    // const res = await axios.post(`/api/confirmation/${token}`);
    const res = await axios.post(`/api/confirmation`, { token: token });
    console.log('token is');
    console.log(token);
    dispatch({
      type: EMAIL_VERIFIED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: VERIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// // @route   GET api/confirmation/:token
// // @desc    Verify user registration token
// // @access  Public
// router.get('/:token', async (req, res) => {
//   try {
//     const user = await User.findOne({ token: token }).select('-password');
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
