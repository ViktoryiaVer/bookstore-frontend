import { FC } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./base/header";
import Input from "./base/input";
import { saveOrUpdateBook } from "../services/bookService";
import Select from "./base/select";
import BookCreate from "../types/bookCreate";
import useBookForm from "../hooks/useBookForm";

interface BookFormProps {}

const BookForm: FC<BookFormProps> = () => {
  const {
    book,
    setBook,
    id,
    authors,
    covers,
    selectedAuthor,
    setSelectedAuthor,
  } = useBookForm();

  const navigate = useNavigate();

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

  const getOptions = (): any[] => {
    if (book.authors.length === 0) return authors;

    const authorLastNames = authors.map((author) => author.lastName);
    book.authors.forEach((author) => {
      if (authorLastNames.indexOf(author.lastName) === -1) {
        authors.push(author);
      }
    });
    return authors;
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
            options={getOptions()}
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
