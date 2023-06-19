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
import { getAuthorsWithParams } from "../../../services/authorService";
import { ActionMeta, MultiValue } from "react-select";
import { toast } from "react-toastify";
import { validate, validateField } from "../../../utils/validationUtils";
import { BookFormValidationSchema } from "../../../validation/bookFormValidationSchema";
import CustomAsyncSelect from "../../base/CustomAsyncSelect";

interface BookFormProps {}

const BookForm: FC<BookFormProps> = () => {
  const { book, setBook, id, covers, selectedAuthors, setSelectedAuthors } =
    useBookForm();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const data: any = { ...book };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setBook(data);

    const checkedFieldError = await validateField(
      name,
      value,
      BookFormValidationSchema
    );
    const newErrors = { ...errors, [name]: checkedFieldError[name] };
    setErrors(newErrors);
  };

  const handleAuthorChange = (
    newValue: MultiValue<Author>,
    actionMeta: ActionMeta<any>
  ) => {
    setSelectedAuthors([...newValue]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: BookCreate = getBookForSavingOrUpdating();

    const errors = await validate(BookFormValidationSchema, data);
    setErrors(errors || {});
    if (errors) return;

    try {
      await saveOrUpdateBook(data);
      navigate("/books/");
    } catch (ex: any) {
      toast.error(ex.response.data.message);
    }
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
            error={errors.title}
          />
          <Input
            name="publisher"
            label="Publisher"
            value={book.publisher}
            onChange={handleChange}
            type="text"
            error={errors.publisher}
          />
          <Input
            name="isbn"
            label="ISBN"
            value={book.isbn || ""}
            onChange={handleChange}
            type="text"
            error={errors.isbn}
          />
          <Input
            name="yearOfPublication"
            label="Year of publication"
            value={book.yearOfPublication}
            onChange={handleChange}
            type="number"
            error={errors.yearOfPublication}
          />
          <Input
            name="price"
            label="Price"
            value={book.price.toLocaleString()}
            onChange={handleChange}
            type="number"
            error={errors.price}
          />
          <Select
            isMulti={false}
            name="cover"
            label="Cover"
            value={book.cover}
            onChange={handleChange}
            options={covers}
            error={errors.cover}
          />
          <CustomAsyncSelect
            label="Author(s)"
            id="async-select"
            className="ms-0 mb-0 m-2"
            isMulti={true}
            value={selectedAuthors}
            getOptionLabel={(option) => option.lastName}
            getOptionValue={(option) => option.lastName}
            placeholder="Type author lastname to search"
            onChange={handleAuthorChange}
            loadOptions={loadOptions}
            error={errors.authorIds}
          />
          <SubmitButton className="btn btn-primary m-2" text="Save" />
        </Form>
      </MainContainer>
    </>
  );
};

export default BookForm;
