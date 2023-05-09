import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getBooks, getBooksWithParams } from "../services/bookService";
import Book from "../types/book";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBooksWithParams(searchParams);
      setBooks(data.books);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBooks();
      setBooks(data.books);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, []);

  return { books, setBooks, totalPages };
};

export default useBooks;
