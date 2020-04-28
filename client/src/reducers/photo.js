import {
  GET_PHOTOS,
  GET_MY_PHOTOS,
  CLEAR_MY_PHOTOS,
  PHOTO_ERROR,
  UPDATE_LIKES,
  DELETE_PHOTO,
  ADD_PHOTO,
  ADD_COMMENT,
  REMOVE_COMMENT,
  MAKE_PROFILE_PIC,
} from '../actions/types';

const initialState = {
  photos: [],
  photo: null,
  // reload: false,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false,
      };
    case GET_MY_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false,
      };
    case ADD_PHOTO:
      return {
        ...state,
        // copy existing photo array, add new photo to the top of the array
        photos: [payload, ...state.photos],
        // photos: { reload : true},
        loading: false,
      };
    case DELETE_PHOTO:
      return {
        ...state,
        // returns all photos except the one that got deleted (the one that matches the payload)
        photos: state.photos.filter((photo) => photo._id !== payload),
        loading: false,
      };
    case MAKE_PROFILE_PIC:
      return {
        ...state,
        photos: state.photos.map((photo) =>
          photo._id === payload.id
            ? { ...photo, isProfilePic: true }
            : { ...photo, isProfilePic: false }
        ),
        loading: false,
      };
    case CLEAR_MY_PHOTOS:
      return {
        ...state,
        photos: null,
        loading: false,
      };
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      // make sure we are adding like to the correct photo
      return {
        ...state,
        photos: state.photos.map((photo) =>
          photo._id === payload.id ? { ...photo, likes: payload.likes } : photo
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        photo: { ...state.photo, comments: payload },
        loading: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        photo: {
          ...state.photo,
          comments: state.photo.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
