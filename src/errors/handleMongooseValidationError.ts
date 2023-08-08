import { Error as MongooseError, CastError } from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/IGenericErrorMessage';
import { IGenericErrorResponse } from '../interfaces/iGenericErrorResponse';

const handleMongooseValidationError = (
  err: MongooseError.ValidationError
): IGenericErrorResponse => {
  
  const error: IGenericErrorMessage[] = Object.values(err.errors).map(
    (er: MongooseError.ValidatorError | CastError) => {
      return {
        path: er.path,
        message: er.message,
      };
    }
  );

  return {
    statusCode: 400,
    message: 'Something Went Wrong',
    errorMessages: error,
  };
};

export default handleMongooseValidationError;