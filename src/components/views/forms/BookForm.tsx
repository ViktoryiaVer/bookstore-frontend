import { FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../base/Header";
import Input from "../../base/Input";
import { saveOrUpdateBook } from "../../../services/bookService";
import Select from "../../base/Select";
import BookCreate from "../../../types/bookCreate";
import useBookForm from "../../../hooks/useBookForm";
import Author from "../../../types/author";
import SubmitButton from "../../base/SubmitButton";
import MainContainer from "../../base/MainContainer";
import Form from "../../base/Form";
import AsyncSelect from "react-select/async";
import { getAuthorsWithParams } from "../../../services/authorService";
import { MultiValue } from "react-select";

interface BookFormProps {}

const BookForm: FC<BookFormProps> = () => {
  const { book, setBook, id, covers, selectedAuthors, setSelectedAuthors } =
    useBookForm();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: any = { ...book };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setBook(data);
  };

  const handleAuthorChange = (newValue: MultiValue<Author>) => {
    setSelectedAuthors([...newValue]);
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
    data.authorIds = selectedAuthors.map((a: Author) => a.id);
    return data as BookCreate;
  };

  const getHeaderText = (): string => {
    return book.id == null ? `New Book` : `Book ${id}`;
  };

  const loadOptions = async (inputValue: string) => {
    searchParams.set("lastName", inputValue);
    setSearchParams(searchParams);
    const { data } = await getAuthorsWithParams(searchParams);
    return data.authors;
  };

  return (
    <>
      <Header text={getHeaderText()} />
      <MainContainer className="form-container">
        <Form onSubmit={handleSubmit}>
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
          <label htmlFor="async-select">Author(s)</label>
          <AsyncSelect
            id="async-select"
            className="ms-0 m-2"
            isMulti
            value={selectedAuthors}
            getOptionLabel={(option) => option.lastName}
            getOptionValue={(option) => option.lastName}
            placeholder="Type author lastname to search"
            onChange={handleAuthorChange}
            loadOptions={loadOptions}
          />
          <SubmitButton className="btn btn-primary m-2" text="Save" />
        </Form>
      </MainContainer>
    </>
  );
};

export default BookForm;
