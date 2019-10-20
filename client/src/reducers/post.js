import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_ATTENDANCE,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  UPDATE_POST
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case GET_POST:
      return {
        ...state,
        loading: false,
        post: payload
      };
    case UPDATE_POST:
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case UPDATE_ATTENDANCE:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, attendees: payload.attendees } : post
        ),
        loading: false
      };
    default:
      return state;
  }
}
