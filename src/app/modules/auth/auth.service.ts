import httpStatus from 'http-status';
import { ILoginUserResponse, IUser } from './auth.interface';
import { User } from './auth.model';
import ApiError from '../../../errors/apiError'
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const signUpUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: IUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;
  const isUserExist = await User.isUserExistWithEmail(email);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not Exist');
  }

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) 
  
  {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is Incorrect');
  }
  const { _id } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );
  return {
    userId: _id,
    accessToken,
    refreshToken,
  };
};

export const AuthService = {
  signUpUser,
  loginUser
};
