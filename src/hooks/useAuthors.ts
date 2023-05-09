import { useEffect, useState } from "react";
import Author from "../types/author";
import { useSearchParams } from "react-router-dom";
import { getAuthors, getAuthorsWithParams } from "../services/authorService";

const useAuthors = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAuthorsWithParams(searchParams);
      setAuthors(data.authors);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAuthors();
      setAuthors(data.authors);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, []);

  return { authors, totalPages, setAuthors };
};

export default useAuthors;
