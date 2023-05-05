import { FC, useEffect, useState } from "react";
import Header from "./base/header";
import BooksTable from "./booksTable";
import Book from "../types/book";
import { deleteBook, getBooks } from "../services/bookService";

interface BooksProps {}

const Books: FC<BooksProps> = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBooks();
      console.log(data);
      setBooks(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (bookId: number) => {
    await deleteBook(bookId);

    const filteredBooks = books.filter((b) => b.id !== bookId);
    setBooks(filteredBooks);
  };

  return (
    <>
      <Header text="Books" />
      <main className="table-container">
        <BooksTable data={books} onDelete={handleDelete} />
      </main>
    </>
  );
};

export default Books;
