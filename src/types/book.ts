import Author from "./author";
import { Cover } from "./enums/cover";

type Book = {
  id?: number;
  title: string;
  publisher: string;
  isbn: string;
  yearOfPublication: number;
  price: number;
  cover: Cover;
  authors: Author[];
};

export default Book;
