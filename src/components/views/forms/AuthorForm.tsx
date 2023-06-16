import { FC } from "react";
import Header from "../../base/Header";
import { useNavigate } from "react-router-dom";
import { saveOrUpdateAuthor } from "../../../services/authorService";
import Input from "../../base/Input";
import useAuthorForm from "../../../hooks/useAuthorForm";
import SubmitButton from "../../base/SubmitButton";
import MainContainer from "../../base/MainContainer";
import Form from "../../base/Form";
import { toast } from "react-toastify";

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
    try {
      await saveOrUpdateAuthor(author);

      navigate("/authors/");
    } catch (ex: any) {
      toast.error(ex.response.data.message);
    }
  };

  const getHeaderText = (): string => {
    return author.id == null ? `New Author` : `Author ${id}`;
  };

  return (
    <>
      <Header text={getHeaderText()} />
      <MainContainer className="form-container">
        <Form onSubmit={handleSubmit}>
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
          <SubmitButton className="btn btn-primary m-2" text="Save" />
        </Form>
      </MainContainer>
    </>
  );
};

export default AuthorForm;
