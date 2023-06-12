import Book from "./book";

type BookPageable = {
  books: Book[];
  totalPages: number;
};

export default BookPageable;
