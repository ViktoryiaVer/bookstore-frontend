import { FC, useState } from "react";
import Header from "../../base/Header";
import { useNavigate } from "react-router-dom";
import { saveOrUpdateAuthor } from "../../../services/authorService";
import Input from "../../base/Input";
import useAuthorForm from "../../../hooks/useAuthorForm";
import SubmitButton from "../../base/SubmitButton";
import MainContainer from "../../base/MainContainer";
import Form from "../../base/Form";
import { toast } from "react-toastify";
import { AuthorValidationSchema } from "../../../validation/AuthorValidationSchema copy";
import { validate, validateField } from "../../../utils/validationUtils";

interface AuthorFormProps {}

const AuthorForm: FC<AuthorFormProps> = () => {
  const { author, setAuthor, id } = useAuthorForm();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...author };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setAuthor(data);

    const checkedFieldError = await validateField(
      name,
      value,
      AuthorValidationSchema
    );
    const newErrors = { ...errors, [name]: checkedFieldError[name] };
    setErrors(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await validate(AuthorValidationSchema, author);
    setErrors(errors || {});
    if (errors) return;

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
            error={errors.firstName}
          />

          <Input
            name="lastName"
            label="Last name"
            value={author.lastName}
            onChange={handleChange}
            type="text"
            error={errors.lastName}
          />
          <Input
            name="birthdate"
            label="Birth date"
            value={author.birthdate.toLocaleString()}
            onChange={handleChange}
            type="date"
            error={errors.birthdate}
          />
          <SubmitButton className="btn btn-primary m-2" text="Save" />
        </Form>
      </MainContainer>
    </>
  );
};

export default AuthorForm;
