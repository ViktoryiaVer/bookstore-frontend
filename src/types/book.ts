type Book = {
  id?: number;
  title: string;
  publisher: string;
  isbn: string;
  yearOfPublication: number;
  price: BigInt;
  cover: Cover;
  authors: [];
};

enum Cover {
  "HARD",
  "SOFT",
  "SPECIAL",
}

export default Book;
