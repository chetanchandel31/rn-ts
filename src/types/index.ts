import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export interface Post {
  description: string;
}

// store
export interface AuthState {
  user: FirebaseAuthTypes.User | null; // TODO: change
  loading: boolean;
  isAuthenticated: boolean;
}

// auth
export type SignupDetails = {
  name: string;
  instaUserName: string;
  bio: string;
  email: string;
  password: string;
  country: string;
  image: string;
} & {
  [prop: string]: string;
};

export type SigninDetails = {
  email: string;
  password: string;
};
