
import { Request,  Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { BookService } from './book.service';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { bookFilterableFields } from './book.constant';



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

const getAllBook = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOptions);
  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const  BookController = {
  createBook,
  getAllBook,
}