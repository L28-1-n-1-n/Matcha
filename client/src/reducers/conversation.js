import {
  POST_CONVERSATION,
  RETRIVAL_ERROR,
  GET_MESSAGE_HISTORY,
} from '../actions/types';

const initialState = {
  conversations: [],
  conversation: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGE_HISTORY:
      return {
        ...state,
        conversations: payload,
      };
    //   case GET_POST:
    //     return {
    //       ...state,
    //       post: payload,
    //       loading: false
    //     };
    case POST_CONVERSATION:
      return {
        ...state,
        conversations: [payload, ...state.conversations],
      };

    case RETRIVAL_ERROR:
      return {
        ...state,
        error: payload,
      };
    //   case UPDATE_LIKES:
    //     // make sure we are adding like to the correct post
    //     return {
    //       ...state,
    //       posts: state.posts.map(post =>
    //         post._id === payload.id ? { ...post, likes: payload.likes } : post
    //       ),
    //       loading: false
    //     };
    //   case ADD_COMMENT:
    //     return {
    //       ...state,
    //       post: { ...state.post, comments: payload },
    //       loading: false
    //     };
    //   case REMOVE_COMMENT:
    //     return {
    //       ...state,
    //       post: {
    //         ...state.post,
    //         comments: state.post.comments.filter(
    //           comment => comment._id !== payload
    //         )
    //       },
    //       loading: false
    //     };
    default:
      return state;
  }
}
