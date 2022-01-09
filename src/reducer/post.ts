import { ERROR_POST, GET_POSTS, PostActionTypes } from "../action/action.types";
import { PostsState } from "../types";

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

    case ERROR_POST:
      return {
        ...state,
        error: true,
      };

    default:
      return state;
  }
};
