import { FC } from "react";
import { Link } from "react-router-dom";
import AuthorsTable from "./authorsTable";
import Header from "./base/header";
import Pagination from "./base/pagination";
import useAuthors from "../hooks/useAuthors";
import { deleteAuthor } from "../services/authorService";

interface AuthorsProps {}

const Authors: FC<AuthorsProps> = () => {
  const { authors, totalPages, setAuthors } = useAuthors();

  const handleDelete = async (authorId: number) => {
    await deleteAuthor(authorId);

    const filteredAuthors = authors.filter((a) => a.id !== authorId);
    setAuthors(filteredAuthors);
  };

  return (
    <>
      <Header text="Authors" />
      <main className="table-container">
        <Link
          to="/authors/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Author
        </Link>
        <AuthorsTable data={authors} onDelete={handleDelete} />
        <Pagination totalPages={totalPages} />
      </main>
    </>
  );
};

export default Authors;
