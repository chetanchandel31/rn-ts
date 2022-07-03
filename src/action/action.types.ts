import { Post, User } from '../types';

export const SET_AUTH_LOADING = 'SET_AUTH_LOADING';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';

export const ERROR_POST = 'ERROR_POST';
export const SET_POSTS_LOADING = 'SET_POSTS_LOADING';
export const GET_POSTS = 'GET_POSTS';
export const DELETE_POST = 'DELETE_POST';
export const UPDATE_POST = 'UPDATE_POST';

// post actions (add, delete, edit etc)
export interface GetPostsAction {
  type: typeof GET_POSTS;
  payload: Post[];
}

export interface DeletePostAction {
  type: typeof DELETE_POST;
  payload: { id: string };
}

export interface ErrorPostAction {
  type: typeof ERROR_POST;
}

export interface SetPostsLoading {
  type: typeof SET_POSTS_LOADING;
  payload: boolean;
}

export interface UpdatePostAction {
  type: typeof UPDATE_POST;
  payload: Post;
}

// auth actions
export interface SignIn {
  type: typeof SIGN_IN;
  payload: User;
}

export interface SignOut {
  type: typeof SIGN_OUT;
}

export interface SetAuthError {
  type: typeof SET_AUTH_ERROR;
  payload: string;
}

export interface SetAuthLoading {
  type: typeof SET_AUTH_LOADING;
  payload: boolean;
}

// broader action types
export type AuthActionTypes = SignIn | SignOut | SetAuthLoading | SetAuthError;

export type PostActionTypes =
  | GetPostsAction
  | DeletePostAction
  | UpdatePostAction
  | ErrorPostAction
  | SetPostsLoading;

export type AppActions = PostActionTypes | AuthActionTypes; // use union to add other action types
