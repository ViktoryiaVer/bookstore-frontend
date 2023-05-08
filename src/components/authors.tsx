import { FC, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AuthorsTable from "./authorsTable";
import { deleteAuthor, getAuthors } from "../services/authorService";
import Header from "./base/header";
import Author from "../types/author";
import Pagination from "./base/pagination";

interface AuthorsProps {}

const Authors: FC<AuthorsProps> = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAuthors();
      setAuthors(data.authors);
      setCurrentPage(data.currentPage);
      setTotalItems(data.totalItems);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, []);

  const handleDelete = async (authorId: number) => {
    await deleteAuthor(authorId);

    const filteredAuthors = authors.filter((a) => a.id !== authorId);
    setAuthors(filteredAuthors);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
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
        <Pagination
          totalItems={totalItems}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>
    </>
  );
};

export default Authors;
