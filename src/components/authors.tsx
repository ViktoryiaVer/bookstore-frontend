import { FC, useEffect, useState } from "react";
import AuthorsTable from "./authorsTable";
import { deleteAuthor, getAuthors } from "../services/authorService";
import Header from "./base/header";
import { Link } from "react-router-dom";
import Author from "../types/author";

interface AuthorsProps {}

const Authors: FC<AuthorsProps> = () => {
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAuthors();
      setAuthors(data);
    };
    fetchData();
  }, []);

  const handleDelete = async (authorId: number) => {
    await deleteAuthor(authorId);

    const filteredAuthors = authors.filter((a) => a.id !== authorId);
    setAuthors(filteredAuthors);
  };

  return (
    <>
      <Header text="Authors" />
      <main className="container">
        <Link
          to="/authors/new"
          className="btn btn-primary"
          style={{ marginBottom: 20 }}
        >
          New Author
        </Link>
        <AuthorsTable data={authors} onDelete={handleDelete} />
      </main>
    </>
  );
};

export default Authors;
