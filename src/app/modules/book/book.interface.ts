import { Model, Types } from "mongoose";

export type IBook = {
  _id: Types.ObjectId;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  reviews: [];
  createdBy?: Types.ObjectId;
  updatedBy?: Types.ObjectId;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookSearch = {
  title?: string;
  author?: string;
  genre?: string;
};

export type IBookFilters = {
  searchTerm?: string;
  publicationYear?: string;
};
