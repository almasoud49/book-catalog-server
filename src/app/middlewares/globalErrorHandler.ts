import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../../config';
import { IGenericErrorMessage } from '../../interfaces/IGenericErrorMessage';
import handleMongooseValidationError from '../../errors/handleMongooseValidationError';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (
  err, 
  req:Request, 
  res:Response, 
  next:NextFunction
  ) => {
    
  console.log('Global error handler ~~ ', err);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifyError = handleMongooseValidationError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } 
  
  else if (err?.name === 'CastError') {
    const simplifyError = handleCastError(err);
    statusCode = simplifyError.statusCode;
    message = simplifyError.message;
    errorMessages = simplifyError.errorMessages;
  } 
  
  else if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = err.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } 
else if (err instanceof Error) {
    message = err.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
 
  res.status(statusCode).send({
    success: false,
    statusCode,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  });
};

export default globalErrorHandler;