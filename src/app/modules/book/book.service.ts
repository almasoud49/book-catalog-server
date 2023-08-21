import { JwtPayload } from 'jsonwebtoken';
import { IBook, IBookFilters } from './book.interface';
import {Book} from './book.model';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { BookSearchableFields} from './book.constant';
import { SortOrder, Types } from 'mongoose';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {

  const { searchTerm, publicationYear, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: BookSearchableFields.map((field: any) => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (publicationYear) {
    const year = publicationYear.trim();
    if (year.length === 4 && /^\d+$/.test(year)) {
      const regex = `\\b${year}\\b`;
      andConditions.push({
        publicationDate: {
          $regex: regex,
        },
      });
    }
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};
  const result = await Book.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (
  id: string | Types.ObjectId,
): Promise<IGenericResponse<IBook | null>> => {
  const result = await Book.findOne({ _id: id }).lean();
  return {
    data: result,
  };
};

const updateBook = async (
  id: string | Types.ObjectId,
  payload: Partial<IBook>,
): Promise<IBook | null> => {
  const result = await Book.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).lean();
  return result;
};

const deleteBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findByIdAndDelete(id);
  return result;
};

const isRouteValid = async (
  userId: string,
  BookId: string
): Promise<boolean> => {
  
  const result = await Book.findOne({ _id: BookId, seller: userId });
  if (!result || result?.errors) return false;
  return true;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  isRouteValid
};
