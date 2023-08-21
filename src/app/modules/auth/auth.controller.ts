import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse, IUser } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../../config";

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  
    if (user.password !== user.confirmPassword) {
    throw new Error('Password and Confirm Password are not Same');
  }

  delete user.confirmPassword;
  
  const result = await AuthService.signUpUser(user);
  
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Signup successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;

  const result = await AuthService.loginUser(loginData);
 
  const { refreshToken, ...others } = result;
  
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in Successfully',
    data: others,
  });
});
export const AuthController = {
  signUpUser,
  loginUser
};