import { Model, Types } from 'mongoose';

export type IUser = {
  _id: Types.ObjectId;
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  userId: Types.ObjectId;
  accessToken: string;
  refreshToken?: string;
};

export type UserModel = {
  isUserExist(id: string): Promise<Pick<IUser, 'email' | 'password' | '_id'>>;

  isUserExistWithEmail(
    email: string,
  ): Promise<Pick<IUser, 'email' | 'password' | '_id'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>;
} & Model<IUser>;
