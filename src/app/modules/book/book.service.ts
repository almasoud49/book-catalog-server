import { JwtPayload } from "jsonwebtoken";
import { IBook, IBookFilters } from "./book.interface";
import Book from "./book.model";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { bookSearchableFields } from "./book.constant";
import { SortOrder } from "mongoose";

const createBook = async(
  payload: IBook,
  
): Promise<IBook> => {
  
  const result = await Book.create(payload);
  return result;
};

const getAllBooks = async(
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
  ): Promise<IGenericResponse<IBook[]>> => {
    
    const {searchTerm, publicationYear, ...filtersData} = filters;
    const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  
    const andConditions = [];
  
    if (searchTerm) {
    andConditions.push({
      $or: bookSearchableFields.map(field => ({
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
  



export const BookService = {
  createBook,
  getAllBooks
}