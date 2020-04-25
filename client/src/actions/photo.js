import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_PHOTOS,
  GET_MY_PHOTOS,
  PHOTO_ERROR,
  CLEAR_MY_PHOTOS,
  UPDATE_LIKES,
  DELETE_PHOTO,
  ADD_PHOTO,
  GET_PHOTO,
  // ADD_COMMENT,
  // REMOVE_COMMENT
} from './types';

// Get photos
export const getPhotos = () => async (dispatch) => {
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

// Get current users photos
export const getMyPhotos = () => async (dispatch) => {
  try {
    // make request to backend api/profile/me
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
export const addPhoto = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data; boundary=${formData._boundary}',
    },
  };

  try {
    const res = await axios.post('/api/photos', formData, config);

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
    dispatch({
      type: ADD_PHOTO,
      payload: res.data,
    });

    dispatch(setAlert('Photo added', 'success'));
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
