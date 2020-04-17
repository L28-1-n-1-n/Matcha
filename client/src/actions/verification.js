import axios from 'axios';
import { setAlert } from './alert';
import { EMAIL_VERIFIED, VERIFICATION_ERROR } from './types';

// Verify user's email
export const verifyEmail = (token) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/confirmation`, { token: token });
    dispatch({
      type: EMAIL_VERIFIED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: VERIFICATION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
