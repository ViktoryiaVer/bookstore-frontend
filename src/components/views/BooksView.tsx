import { FC, useEffect, useState } from "react";
import Header from "../base/Header";
import BooksTable from "../tables/BooksTable";
import {
  deleteBook,
  getBooks,
  getBooksWithParams,
} from "../../services/bookService";
import { Link, useSearchParams } from "react-router-dom";
import Pagination from "../base/Pagination";
import useCurrentUser from "../../hooks/useCurrentUser";
import MainContainer from "../base/MainContainer";
import { toast } from "react-toastify";
import { usePageLoader } from "../../hooks/usePageLoader";
import Book from "../../types/book";

interface BooksViewProps {}

const BooksView: FC<BooksViewProps> = () => {
  const { isAdmin } = useCurrentUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { loader, showLoader, hideLoader } = usePageLoader();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchBooksInitially = async () => {
      showLoader();
      const { data } = await getBooks();
      hideLoader();

      setBooks(data.books);
      setTotalPages(data.totalPages);
    };
    fetchBooksInitially();
  }, []);

  useEffect(() => {
    const fetchBooksAfterChangingParams = async () => {
      showLoader();
      const { data } = await getBooksWithParams(searchParams);
      hideLoader();

      setBooks(data.books);
    };
    fetchBooksAfterChangingParams();
  }, [searchParams]);

  const handleDelete = async (bookId: number) => {
    try {
      showLoader();
      await deleteBook(bookId);
      hideLoader();

      const filteredBooks = books.filter((b) => b.id !== bookId);
      setBooks(filteredBooks);
    } catch (ex: any) {
      toast.error(ex.response.data.message);
    }
  };

  return (
    <>
      <Header text="Books" />
      <MainContainer className="table-container">
        {isAdmin && (
          <Link
            to="/books/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Book
          </Link>
        )}
        <BooksTable data={books} onDelete={handleDelete} />
        <Pagination totalPages={totalPages} />
        <>{loader}</>
      </MainContainer>
    </>
  );
};

export default BooksView;
