// types.ts
export interface SignUpResponse {
  message: string;
  user?: {
    id: number;
    username: string;
    email: string;
  };
  error?: string;
}

export interface SignInResponse {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: {
    token: string;
  };
}

export interface ChecklistResponse {
  statusCode: number;
  message: string;
  errorMessage: string | null;
  data: [];
}
