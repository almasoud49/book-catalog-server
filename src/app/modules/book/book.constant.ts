import { IBookFilters, IBookSearch } from "./book.interface";

export const bookSearchableFields: (keyof IBookSearch)[] = [
  'genre',
  'author',
  'title'
];

export const bookFilterableFields: (keyof IBookFilters)[]= [
  'genre',
  'publicationYear'
];

