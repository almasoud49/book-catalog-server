import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

export const BookSchema = new Schema<IBook>(
  {
    title: { 
      type: String, 
      required: true 
    },
    author: { 
      type: String, 
      required: true 
    },
    genre: { 
      type: String, 
      required: true 
    },
    publicationDate: { 
      type: String, 
      required: true 
    },
    reviews: { 
      type: [], 
      required: false 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      required: false, 
      ref: 'User' 
    },
    updatedBy: { 
      type: Schema.Types.ObjectId, 
      required: false, 
      ref: 'User' 
    },
  },
  { 
    timestamps: true, 
    versionKey: false 
  }
);

export const Book = model<IBook, BookModel>('Book', BookSchema);

