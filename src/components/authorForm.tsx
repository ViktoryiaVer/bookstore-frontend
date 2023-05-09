import { FC } from "react";
import Header from "./base/header";
import { useNavigate } from "react-router-dom";
import { saveOrUpdateAuthor } from "../services/authorService";
import Input from "./base/input";
import useAuthorForm from "../hooks/useAuthorForm";

interface AuthorFormProps {}

const AuthorForm: FC<AuthorFormProps> = () => {
  const { author, setAuthor, id } = useAuthorForm();
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...author };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setAuthor(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await saveOrUpdateAuthor(author);

    navigate("/authors/");
  };

  const getHeaderText = (): string => {
    return author.id == null ? `New Author` : `Author ${id}`;
  };

  return (
    <>
      <Header text={getHeaderText()} />
      <main className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <Input
            name="firstName"
            label="First name"
            value={author.firstName}
            onChange={handleChange}
            type="text"
          />

          <Input
            name="lastName"
            label="Last name"
            value={author.lastName}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="birthdate"
            label="Birth date"
            value={author.birthdate.toLocaleString()}
            onChange={handleChange}
            type="date"
          />
          <button type="submit" className="btn btn-primary m-2">
            Save
          </button>
        </form>
      </main>
    </>
  );
};

export default AuthorForm;
