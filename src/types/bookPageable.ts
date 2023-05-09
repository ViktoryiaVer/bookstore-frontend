import Book from "./book";

type BookPageable = {
  books: Book[];
  totalPages: number;
  pageable: {};
};

export default BookPageable;
