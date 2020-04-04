import {
  GET_PHOTOS,
  PHOTO_ERROR,
  UPDATE_LIKES,
  DELETE_PHOTO,
  ADD_PHOTO,
  GET_PHOTO,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  photos: [],
  photo: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PHOTOS:
      return {
        ...state,
        photos: payload,
        loading: false
      };
    case GET_PHOTO:
      return {
        ...state,
        photo: payload,
        loading: false
      };
    case ADD_PHOTO:
      return {
        ...state,
        // copy existing photo array, add new photo to the top of the array
        photos: [payload, ...state.photos],
        loading: false
      };
    case DELETE_PHOTO:
      return {
        ...state,
        // returns all photos except the one that got deleted (the one that matches the payload)
        photos: state.photos.filter(photo => photo._id !== payload),
        loading: false
      };
    case PHOTO_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_LIKES:
      // make sure we are adding like to the correct photo
      return {
        ...state,
        photo: state.photos.map(photo =>
          photo._id === payload.id ? { ...photo, likes: payload.likes } : photo
        ),
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        photo: { ...state.photo, comments: payload },
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        photo: {
          ...state.photo,
          comments: state.photo.comments.filter(
            comment => comment._id !== payload
          )
        },
        loading: false
      };
    default:
      return state;
  }
}
