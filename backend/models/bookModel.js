import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },

    isbn: {
      type: Number,
      required: true,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    categories: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);
