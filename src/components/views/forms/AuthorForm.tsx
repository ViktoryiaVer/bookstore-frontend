import { FC, useEffect, useState } from "react";
import Header from "../../base/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthor, saveOrUpdateAuthor } from "../../../services/authorService";
import Input from "../../base/Input";
import SubmitButton from "../../base/SubmitButton";
import MainContainer from "../../base/MainContainer";
import Form from "../../base/Form";
import { toast } from "react-toastify";
import { AuthorFormValidationSchema } from "../../../validation/authorFormValidationSchema";
import { validate, validateField } from "../../../utils/validationUtils";
import Author from "../../../types/author";
import { usePageLoader } from "../../../hooks/usePageLoader";

interface AuthorFormProps {}

const AuthorForm: FC<AuthorFormProps> = () => {
  const [author, setAuthor] = useState<Author>({
    firstName: "",
    lastName: "",
    birthdate: new Date().toISOString().split("T")[0],
  });
  const { loader, showLoader, hideLoader } = usePageLoader();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthor = async () => {
      if (id === "new") {
        return;
      }

      showLoader();
      const { data } = await getAuthor(Number(id));
      hideLoader();
      setAuthor(data);
    };

    fetchAuthor();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...author };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setAuthor(data);

    const checkedFieldError = await validateField(
      name,
      value,
      AuthorFormValidationSchema
    );
    const newErrors = { ...errors, [name]: checkedFieldError[name] };
    setErrors(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errors = await validate(AuthorFormValidationSchema, author);
    setErrors(errors || {});
    if (errors) return;

    try {
      showLoader();
      await saveOrUpdateAuthor(author);
      hideLoader();

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
        <>{loader}</>
      </MainContainer>
    </>
  );
};

export default AuthorForm;
