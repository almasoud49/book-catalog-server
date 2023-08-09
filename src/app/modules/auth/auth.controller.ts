import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { IUser } from "./auth.interface";
import httpStatus from "http-status";

const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  
    if (user.password != user.confirmPassword) {
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


export const AuthController = {
  signUpUser
};