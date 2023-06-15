import { useEffect, useState } from "react";
import Book from "../types/book";
import { Cover } from "../types/enums/cover";
import Author from "../types/author";
import { useParams } from "react-router-dom";
import { getBook } from "../services/bookService";
import { getAuthors } from "../services/authorService";

const useBookForm = () => {
  const [book, setBook] = useState<Book>({
    title: "",
    publisher: "",
    isbn: "",
    yearOfPublication: 0,
    price: BigInt(0),
    cover: Cover.HARD,
    authors: [],
  });
  const [authors, setAuthors] = useState<Author[]>([]);

  const [selectedAuthor, setSelectedAuthor] = useState("");

  const covers = Object.values(Cover).filter(
    (value) => typeof value === "string"
  ) as string[];

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id === "new") {
        return;
      }

      const { data } = await getBook(Number(id));
      setBook(data);
      setSelectedAuthor(data?.authors[0].lastName || "");
    };

    fetchData();
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    const { data } = await getAuthors();
    return setAuthors(data.authors);
  };

  return {
    book,
    setBook,
    id,
    authors,
    covers,
    selectedAuthor,
    setSelectedAuthor,
  };
};

export default useBookForm;
