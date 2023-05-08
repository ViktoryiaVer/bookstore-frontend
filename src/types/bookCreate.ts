import { Cover } from "./enums/cover";

export type BookCreate = {
  id?: number;
  title: string;
  publisher: string;
  isbn: string;
  yearOfPublication: number;
  price: BigInt;
  cover: Cover;
  authorIds: number[];
};

export default BookCreate;
