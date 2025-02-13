import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  DISCONNECT,
  // GET_CHAT_LIST,
} from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  // userlist: [],
  repos: [],
  loading: true,
  justCreatedProfile: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
    case DISCONNECT:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    // case GET_CHAT_LIST:
    //   return {
    //     ...state,
    //     userlist: payload,
    //     loading: false,
    //   };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null, // Clear the profile state of the last user browsed, before a new one registers
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };

    default:
      return state;
  }
}
