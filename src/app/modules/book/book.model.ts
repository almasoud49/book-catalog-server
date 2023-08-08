import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    publicationYear: {
      type: String,
    },

    image: {
      type: String,
      required:true,
    },

    addedBy: {
      type: String,
    },

    wishedBy: {
      type: [String],
      default: null,
    },

    readList: {
      type: [
        {
          emailAddress: {
            type: String,
            required: true,
          },
          status: {
            type: String,
            enum: ['reading', 'read soon', 'finished'],
          },
        },
      ],
      default: null,
    },
    review: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
          date: {
            type: String,
            required: true,
          },
          body: {
            type: String,
            required: true,
          },
        },
      ],
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Book = model<IBook>('Book', bookSchema);

export default Book;