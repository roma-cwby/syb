import type { IError } from 'types';

const errorMessagesList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
};

export const httpError = (status: number, message: string = errorMessagesList[status]): IError => {
  const error: IError = new Error(message);
  error.status = status;
  return error;
};
