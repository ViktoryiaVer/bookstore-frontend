import { FC } from "react";
import Header from "../base/Header";
import BooksTable from "../tables/BooksTable";
import { deleteBook } from "../../services/bookService";
import { Link } from "react-router-dom";
import Pagination from "../base/Pagination";
import useBooks from "../../hooks/useBooks";
import useCurrentUser from "../../hooks/useCurrentUser";
import MainContainer from "../base/MainContainer";
import { toast } from "react-toastify";

interface BooksProps {}

const Books: FC<BooksProps> = () => {
  const { isAdmin } = useCurrentUser();
  const { books, setBooks, totalPages } = useBooks();

  const handleDelete = async (bookId: number) => {
    try {
      await deleteBook(bookId);

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
      </MainContainer>
    </>
  );
};

export default Books;
