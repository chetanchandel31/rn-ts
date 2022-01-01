import { ERROR_POST, GET_POSTS, PostActionTypes } from "../action/action.types";
import { Post } from "../types";

interface PostsInStore {
  posts: Post[] | null;
  loading: boolean;
  error: boolean;
}

const initialState: PostsInStore = {
  posts: null,
  loading: true,
  error: false,
};

export default (
  state = initialState,
  action: PostActionTypes
): PostsInStore => {
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
