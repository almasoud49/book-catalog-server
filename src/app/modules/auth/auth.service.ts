import { IUser } from './auth.interface';
import { User } from './auth.model';

const signUpUser = async (payload: IUser): Promise<IUser> => {
  const result = await User.create(payload);
  return result;
};

export const AuthService = {
  signUpUser,
  // loginUser
};
