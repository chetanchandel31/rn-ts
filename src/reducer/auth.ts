import { IS_AUTHENTICATED, SET_USER } from "../action/action.types";

interface UserInStore {
  user: null | Object; // TODO: change
  loading: boolean;
  isAuthenticated: boolean;
}

const initialState: UserInStore = {
  user: null,
  loading: true,
  isAuthenticated: false,
};
// TODO: better types
export default (state = initialState, action: any): UserInStore => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
