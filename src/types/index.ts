export interface iUser {
  name: string;
  email: string;
  password: string;
  token: string;
  avatar: string;
}

export interface IError extends Error {
  status?: number;
}
