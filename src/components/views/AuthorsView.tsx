import { FC } from "react";
import { Link } from "react-router-dom";
import AuthorsTable from "../tables/AuthorsTable";
import Header from "../base/Header";
import Pagination from "../base/Pagination";
import useAuthors from "../../hooks/useAuthors";
import { deleteAuthor } from "../../services/authorService";
import useCurrentUser from "../../hooks/useCurrentUser";
import MainContainer from "../base/MainContainer";
import { toast } from "react-toastify";

interface AuthorsProps {}

const Authors: FC<AuthorsProps> = () => {
  const { isAdmin } = useCurrentUser();
  const { authors, totalPages, setAuthors } = useAuthors();

  const handleDelete = async (authorId: number) => {
    try {
      await deleteAuthor(authorId);

      const filteredAuthors = authors.filter((a) => a.id !== authorId);
      setAuthors(filteredAuthors);
    } catch (ex: any) {
      toast.error(ex.response.data.message);
    }
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
