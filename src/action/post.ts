import database from "@react-native-firebase/database";
import { Dispatch } from "redux";
import {
  AppActions,
  ErrorPostAction,
  ERROR_POST,
  GET_POSTS,
} from "./action.types";

export const getPosts = () => {
  return async (dispatch: Dispatch<AppActions>, getState: Function) => {
    // TODO: type getState after working on store
    try {
      database()
        .ref("/posts/")
        .on("value", (snapshot: any) => {
          if (snapshot.val()) {
            dispatch({
              type: GET_POSTS,
              payload: Object.values(snapshot.val()),
            });
          } else {
            dispatch({ type: GET_POSTS, payload: [] });
          }
        });
    } catch (err) {
      dispatch({ type: ERROR_POST });
    }
  };
};
