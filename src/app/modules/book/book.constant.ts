import { IBookFilters, IBookSearch } from "./book.interface";

export const bookSearchFields: (keyof IBookSearch)[] = [
  'genre',
  'author',
  'title'
];

export const bookFilterFields: (keyof IBookFilters)[]= [
  'genre',
  'publicationYear'
];

