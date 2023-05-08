import { FC, useEffect, useState } from "react";
import Book from "../types/book";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./base/header";
import Input from "./base/input";
import { getBook, saveOrUpdateBook } from "../services/bookService";
import Select from "./base/select";
import { Cover } from "../types/enums/cover";
import { getAuthors } from "../services/authorService";
import Author from "../types/author";
import BookCreate from "../types/bookCreate";

interface BookFormProps {}

const BookForm: FC<BookFormProps> = () => {
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

  const navigate = useNavigate();

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

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: any = { ...book };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setBook(data);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAuthor(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: any = getBookForSavingOrUpdating();

    await saveOrUpdateBook(data);

    navigate("/books/");
  };

  const getBookForSavingOrUpdating = (): BookCreate => {
    const data: any = { ...book };
    delete data.authors;
    data.authorIds = authors
      .filter((a) => a.lastName === selectedAuthor)
      .map((a: any) => a.id);
    return data as BookCreate;
  };

  const getHeaderText = (): string => {
    return book.id == null ? `New Book` : `Book ${id}`;
  };

  return (
    <>
      <Header text={getHeaderText()} />
      <main className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <Input
            name="title"
            label="Title"
            value={book.title}
            onChange={handleChange}
            type="text"
          />

          <Input
            name="publisher"
            label="Publisher"
            value={book.publisher}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="isbn"
            label="ISBN"
            value={book.isbn || ""}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="yearOfPublication"
            label="Year of publication"
            value={book.yearOfPublication}
            onChange={handleChange}
            type="number"
          />
          <Input
            name="price"
            label="Price"
            value={book.price.toLocaleString()}
            onChange={handleChange}
            type="number"
          />
          <Select
            isMulti={false}
            name="cover"
            label="Cover"
            value={book.cover}
            onChange={handleChange}
            options={covers}
          />
          <Select
            isMulti={false}
            name="authors"
            label="Author(s)"
            valuePath="lastName"
            value={selectedAuthor}
            onChange={handleAuthorChange}
            options={authors}
          />
          <button type="submit" className="btn btn-primary m-2">
            Save
          </button>
        </form>
      </main>
    </>
  );
};

export default BookForm;
