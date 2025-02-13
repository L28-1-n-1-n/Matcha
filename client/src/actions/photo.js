import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PHOTOS,
  GET_MY_PHOTOS,
  PHOTO_ERROR,
  CLEAR_MY_PHOTOS,
  CLEAR_PHOTOS,
  CLEAR_PROFILE,
  UPDATE_LIKES,
  DELETE_PHOTO,
  ADD_PHOTO,
  GET_PHOTO,
  MAKE_PROFILE_PIC,
  GET_PROFILE_PIC_BY_ID,
  GET_ALL_PHOTOS_BY_ID,
  ADD_CLICKED_BY,
  FIRST_PHOTO_UPLOADED,
  ADD_LIKED_BY,
  GET_FILTERED_PHOTOS,
  ADD_NOTIFICATION_LIKE,
  GET_RECENT_PHOTOS,
  GET_CONNECTED_PHOTOS,
  // ADD_COMMENT,
  // REMOVE_COMMENT
} from './types';
import io from 'socket.io-client';
import { forceRefresh } from './socClient';
// Get photos
export const getPhotos = () => async (dispatch) => {
  dispatch({ type: CLEAR_PHOTOS });
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/photos');

    dispatch({
      type: GET_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get filtered photos
export const getFilteredPhotos = () => async (dispatch) => {
  dispatch({ type: CLEAR_PHOTOS });
  // dispatch({ type: CLEAR_PROFILE });
  try {
    const res = await axios.get('/api/photos/filteredMatches');
    console.log(res);
    dispatch({
      type: GET_FILTERED_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Recent photos
export const getRecentPhotos = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/photos/recentPhotos');
    console.log(res);
    dispatch({
      type: GET_RECENT_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Connected photos
export const getConnectedPhotos = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/photos/connectedPhotos');
    console.log(res);
    dispatch({
      type: GET_CONNECTED_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get current users photos
export const getMyPhotos = (userId) => async (dispatch) => {
  try {
    // make request to backend api/photos/me
    const res = await axios.get('/api/photos/me');

    dispatch({
      type: GET_MY_PHOTOS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_MY_PHOTOS });
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get current users photos
export const getAllPhotosById = (userId) => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  try {
    // make request to backend api/photos/${userId}/all
    const res = await axios.get(`/api/photos/${userId}/all`);

    dispatch({
      type: GET_ALL_PHOTOS_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_MY_PHOTOS });
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get photo by ID
export const getProfilePicById = (userId) => async (dispatch) => {
  try {
    // make request to backend api/profile/user/${userId}/profilepic
    const res = await axios.get(`/api/photos/${userId}/profilepic`);
    console.log(userId);
    dispatch({
      type: GET_PROFILE_PIC_BY_ID,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: CLEAR_MY_PHOTOS });
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// // Get profile by ID
// export const getPhotoById = (userId) => async (dispatch) => {
//   try {
//     // make request to backend api/profile/user/${userId}
//     const res = await axios.get(`/api/profile/user/${userId}`);

//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };

// arrayBufferToBase64(buffer) {
//   var binary = '';
//   var bytes = [].slice.call(new Uint8Array(buffer));
//   bytes.forEach((b) => binary += String.fromCharCode(b));
//   return window.btoa(binary);
// };

// componentDidMount() {
//   fetch('http://yourserver.com/api/img_data')
//   .then((res) => res.json())
//   .then((data) => {
//       // console.log(img)
//       var base64Flag = 'data:image/jpeg;base64,';
//       var imageStr = this.arrayBufferToBase64(data.img.data.data);
//       this.setState({
//           img: base64Flag + imageStr
//       )}
//   })
// }

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/photos/like/${id}`);
    console.log('res.data is');
    console.log(res.data);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: 'server error', status: 500 },
    });
  }
};

// Add LikedBy
export const addLikedBy = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/photos/likedby/${id}`);
    console.log(res);

    dispatch({
      type: ADD_LIKED_BY,
      payload: { id, likedBy: res.data },
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: 'server error', status: 500 },
    });
  }
};

// Add Notification
export const addNotification = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/photos/notifylike/${id}`);
    console.log(res);
    dispatch({
      type: ADD_NOTIFICATION_LIKE,
      payload: { id, notifcations: res.data },
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: 'server error', status: 500 },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/photos/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Information that one user clicked the profile of another user
export const addClickedBy = (targetProfileID, myUserID) => async (dispatch) => {
  try {
    const res = await axios.put(
      `/api/photos/clicked/${targetProfileID}/${myUserID}`
    );
    console.log(res);
    dispatch({
      type: ADD_CLICKED_BY,
      payload: { targetProfileID, myUserID, checkedOutBy: res.data },
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: 'server error', status: 500 },
    });
  }
};

// Delete photo
export const deletePhoto = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/photos/${id}`);

    dispatch({
      type: DELETE_PHOTO,
      payload: id,
    });

    dispatch(setAlert('Photo Removed', 'success'));
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add photo

// const socket = io.connect('http://localhost:5000');
export const addPhoto = () => (dispatch) => {
  // const config = {
  //   headers: {
  //     'Content-Type': 'multipart/form-data; boundary=${formData._boundary}',
  //   },
  // };      console.log(socket);
  //Message from server
  // var photo;
  // socket.on('message', (message) => {
  //   console.log(message);
  //   photo = message;
  //   // outputMessage(message);
  // });
  try {
    // const res = await axios.post('/api/photos', formData, config);

    // const res = await axios.post(
    //   '/api/photos',
    //   upload.single('file'),
    //   (req, res) => {
    //     console.log('we are here');
    //     res.json({ file: req.file });
    //     res.redirect('/');
    //     console.log('Success!');
    //   }
    // );
    // console.log('teyy');
    // console.log(photo);
    // dispatch({
    //   type: ADD_PHOTO,
    //   payload: { photo: photo, reload: true },
    // });

    // dispatch({
    //   type: ADD_PHOTO,
    //   // payload: { photo: photo, reload: true },
    // });
    dispatch(setAlert('Photo added', 'success'));
    dispatch({ type: FIRST_PHOTO_UPLOADED });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    // }
  }
};

// Get photo
export const getPhoto = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/photos/${id}`);

    dispatch({
      type: GET_PHOTO,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Make this picture the profile pic
export const makeProfilePic = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/photos/isProfilePic/${id}`);
    console.log(res);
    dispatch({
      type: MAKE_PROFILE_PIC,
      payload: { id, isProfilePic: res.data },
    });
    dispatch(setAlert('Profile Picture set', 'success'));
  } catch (err) {
    dispatch({
      type: PHOTO_ERROR,
      // payload: { msg: err.response.statusText, status: err.response.status },
      payload: { msg: 'server error', status: 500 },
    });
  }
};

// Add comment
// export const addComment = (postId, formData) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };

//   try {
//     const res = await axios.post(
//       `/api/posts/comment/${postId}`,
//       formData,
//       config
//     );

//     dispatch({
//       type: ADD_COMMENT,
//       payload: res.data
//     });

//     dispatch(setAlert('Comment Added', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };

// Delete comment
// export const deleteComment = (postId, commentId) => async dispatch => {
//   try {
//     await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

//     dispatch({
//       type: REMOVE_COMMENT,
//       payload: commentId
//     });

//     dispatch(setAlert('Comment Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
