import { Cover } from "./enums/cover";

type Book = {
  id?: number;
  title: string;
  publisher: string;
  isbn: string;
  yearOfPublication: number;
  price: number;
  cover: Cover;
  authorIds: number[];
};

export default Book;
