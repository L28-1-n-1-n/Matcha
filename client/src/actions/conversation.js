import axios from 'axios';

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  POST_CONVERSATION,
  RETRIVAL_ERROR,
} from './types';

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  // prevent flashing the past user's profile by clearing the state
  dispatch({ type: CLEAR_PROFILE });

  try {
    // make request to backend api/profile
    const res = await axios.get('/api/profile');
    console.log(res);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get corresponding conversation
export const postConversation = (targetUserID, transMsg) => async (
  dispatch
) => {
  console.log('front reached');
  console.log(targetUserID);
  console.log(transMsg);
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post(
      `/api/conversation/${targetUserID}`,
      transMsg,
      config
    );
    console.log(res);
    dispatch({
      type: POST_CONVERSATION,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: RETRIVAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Add post
// export const addPost = (formData) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   console.log(formData);
//   try {
//     const res = await axios.post('/api/posts', formData, config);
//     console.log(res);
//     dispatch({
//       type: ADD_POST,
//       payload: res.data,
//     });

//     dispatch(setAlert('Post Created', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// // Add comment
// export const sendMessage = (postId, formData) => async (dispatch) => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   try {
//     const res = await axios.post(
//       `/api/posts/comment/${postId}`,
//       formData,
//       config
//     );

//     dispatch({
//       type: ADD_COMMENT,
//       payload: res.data,
//     });

//     dispatch(setAlert('Comment Added', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
