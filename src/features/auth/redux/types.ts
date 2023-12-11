export interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  fetching: boolean;
  error: string | null;
}

export interface RegisterPayload {
  email: string;
  password: string;
  role: string; // 'regular'
}

export interface LoginPayload {
  email: string;
  password: string;
}
