
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

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.getSingleBook(req.params.id);
  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Retrieved successfully',
    data: result.data,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  req.body.updatedBy = req.user?._id;
  const updatedData = req.body;
  const result = await BookService.updateBook(id, updatedData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully !',
    data: result,
  });
});
const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.deleteBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully',
    data: result,
  });
});

export const  BookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook
}