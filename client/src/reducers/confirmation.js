import { EMAIL_VERIFIED, VERIFICATION_ERROR } from '../actions/types';

const initialState = {
  user: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EMAIL_VERIFIED:
      return {
        ...state,
        user: payload,
        loading: false,
      };

    case VERIFICATION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
