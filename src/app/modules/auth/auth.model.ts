import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './auth.interface';
import config from '../../../config';

export const UserSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
      select: 0,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

UserSchema.statics.isUserExist = async function (
  _id: string,
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  
  return await User.findOne(
    { _id }, 
    { email: 1, password: 1 });
};

UserSchema.statics.isUserExistWithEmail = async function (
  email: string,
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  
  return await User.findOne(
    { email }, 
    { email: 1, password: 1 });
};

UserSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  
  return await bcrypt.compare(givenPassword, savedPassword);
};

UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

export const User = model<IUser, UserModel>('User', UserSchema);
