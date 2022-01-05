export interface Post {
  description: string;
}

// store
export interface AuthState {
  user: null | Object; // TODO: change
  loading: boolean;
  isAuthenticated: boolean;
}
