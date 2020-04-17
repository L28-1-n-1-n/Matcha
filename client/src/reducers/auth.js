import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  justRegistered: null,
  loading: true, // default true, once loaded, loading is set to false
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action; // take out type and payload from action

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload, // name, email, avatar... everything but the password
      };
    // case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token); // set the token in local storage, payload is an object
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false, // it's been loaded, so set to false
      };
    case REGISTER_SUCCESS:
      localStorage.removeItem('token'); // Remove token completely from local storage
      return {
        ...state,
        token: null,
        justRegistered: true,
        isAuthenticated: false,
        loading: false, // even though authentication failed, it is still done loading
      };
    case REGISTER_FAIL:
      localStorage.removeItem('token'); // Remove token completely from local storage
      return {
        ...state,
        token: null,
        justRegistered: false,
        isAuthenticated: false,
        loading: false, // even though authentication failed, it is still done loading
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case ACCOUNT_DELETED:
      localStorage.removeItem('token'); // Remove token completely from local storage
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false, // even though authentication failed, it is still done loading
      };
    default:
      return state;
  }
}
