import { errorResponse } from '../utils/response.js';

export const errorMiddleware = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error.code === '23505') {
    return errorResponse(
      res,
      'Phone number already exists',
      409
    );
  }

  return errorResponse(
    res,
    error.message || 'Internal Server Error',
    500
  );
};