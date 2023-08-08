import { Model, Types } from "mongoose";
import { IUser } from "../user/user.interface";


export interface IReading {
  emailAddress: string;
  status?:  'reading' | 'read soon' | 'finished';
};



export interface IReview {
  name: string;
  date: string;
  body: string;
};

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate?: string;
  image?: string;
  addedBy?: Types.ObjectId | IUser;
  wishedBy?: string[] | null;
  readList?: IReading[] | null;
  review?: IReview[] | null;
};

export type BookModel = Model<IBook, Record<string, unknown>>;

export type IBookSearch = {
  title?: string;
  author?: string;
  genre?: string;
};

export type IBookFilters = {
  searchTerm?: string;
  genre?: string;
  publicationYear?: string;
};