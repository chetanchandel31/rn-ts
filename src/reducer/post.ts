import {
  ERROR_POST,
  GET_POSTS,
  PostActionTypes,
  SET_POSTS_LOADING,
  UPDATE_POST,
} from '../action/action.types';
import { PostsState } from '../types';

const initialState: PostsState = {
  posts: null,
  loading: true,
  error: false,
};

export default (state = initialState, action: PostActionTypes): PostsState => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: false,
      };

    case UPDATE_POST:
      return {
        ...state,
        posts:
          state.posts?.map(post => {
            if (post._id === action.payload._id) {
              return action.payload;
            }
            return post;
          }) || null,
        error: false,
        loading: false,
      };

    case ERROR_POST:
      return {
        ...state,
        error: true,
        loading: false,
      };

    case SET_POSTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
