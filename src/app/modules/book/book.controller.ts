
import { Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';



const createBook =  catchAsync(async(req: Request , res: Response) => {

const book = req.body;
book.createdBy = req.user?._id
const result = await BookService.createBook(book);

sendResponse<IBook>(res, {
  statusCode: httpStatus.OK,
  success: true,
  message: 'Book Created Successfully!',
  data: result,
});

});


export const  BookController = {
  createBook,
}