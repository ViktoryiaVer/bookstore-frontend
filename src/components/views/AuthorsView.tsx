import { FC } from "react";
import { Link } from "react-router-dom";
import AuthorsTable from "../tables/AuthorsTable";
import Header from "../base/Header";
import Pagination from "../base/Pagination";
import useAuthors from "../../hooks/useAuthors";
import { deleteAuthor } from "../../services/authorService";
import useCurrentUser from "../../hooks/useCurrentUser";
import MainContainer from "../base/MainContainer";

interface AuthorsProps {}

const Authors: FC<AuthorsProps> = () => {
  const { isAdmin } = useCurrentUser();
  const { authors, totalPages, setAuthors } = useAuthors();

  const handleDelete = async (authorId: number) => {
    await deleteAuthor(authorId);

    const filteredAuthors = authors.filter((a) => a.id !== authorId);
    setAuthors(filteredAuthors);
  };

  return (
    <>
      <Header text="Authors" />
      <MainContainer className="table-container">
        {isAdmin && (
          <Link
            to="/authors/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Author
          </Link>
        )}
        <AuthorsTable data={authors} onDelete={handleDelete} />
        <Pagination totalPages={totalPages} />
      </MainContainer>
    </>
  );
};

export default Authors;
