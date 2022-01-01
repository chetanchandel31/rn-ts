import { Post } from "../types";

export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const SET_USER = "SET_USER";

export const GET_POSTS = "GET_POSTS"; // c: it was "SET_POST"
export const ERROR_POST = "ERROR_POST";
export const DELETE_POST = "DELETE_POST"; // c

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

export type PostActionTypes =
  | GetPostsAction
  | DeletePostAction
  | ErrorPostAction;

export type AppActions = PostActionTypes; // use union to add other action types
