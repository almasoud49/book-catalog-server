import { Model } from "mongoose";

export type IUser = {
  emailAddress: string;
  password: string;
  confirmPassword: string;
};


export type IMyProfile = {
  emailAddress: string;
  
};

export interface IUserMethods {
  isUserExists(emailAddress: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    DbPassword: string
  ): Promise<boolean>;
};

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>;