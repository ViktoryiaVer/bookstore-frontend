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
  const [selectedAuthors, setSelectedAuthors] = useState<Author[]>([]);

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
      setSelectedAuthors(data?.authors);
    };

    fetchData();
  }, []);

  return {
    book,
    setBook,
    id,
    covers,
    selectedAuthors,
    setSelectedAuthors,
  };
};

export default useBookForm;
