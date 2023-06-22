import { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthorsTable from "../tables/AuthorsTable";
import Header from "../base/Header";
import Pagination from "../base/Pagination";
import {
  deleteAuthor,
  getAuthors,
  getAuthorsWithParams,
} from "../../services/authorService";
import useCurrentUser from "../../hooks/useCurrentUser";
import MainContainer from "../base/MainContainer";
import { toast } from "react-toastify";
import { usePageLoader } from "../../hooks/usePageLoader";
import Author from "../../types/author";

interface AuthorsViewProps {}

const AuthorsView: FC<AuthorsViewProps> = () => {
  const { isAdmin } = useCurrentUser();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const { loader, showLoader, hideLoader } = usePageLoader();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchAuthorsInitially = async () => {
      showLoader();
      const { data } = await getAuthors();
      hideLoader();

      setAuthors(data.authors);
      setTotalPages(data.totalPages);
    };
    fetchAuthorsInitially();
  }, []);

  useEffect(() => {
    const fetchAuthorsAfterChangingParams = async () => {
      showLoader();
      const { data } = await getAuthorsWithParams(searchParams);
      hideLoader();

      setAuthors(data.authors);
    };
    fetchAuthorsAfterChangingParams();
  }, [searchParams]);

  const handleDelete = async (authorId: number) => {
    try {
      showLoader();
      await deleteAuthor(authorId);
      hideLoader();

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
        <>{loader}</>
      </MainContainer>
    </>
  );
};

export default AuthorsView;
