import { FC, useState } from "react";
import Header from "../../base/Header";
import Input from "../../base/Input";
import Login from "../../../types/login";
import { doLogin } from "../../../services/authenticationService";
import { useLocation } from "react-router-dom";
import SubmitButton from "../../base/SubmitButton";
import MainContainer from "../../base/MainContainer";
import Form from "../../base/Form";
import { toast } from "react-toastify";
import { validate, validateField } from "../../../utils/validationUtils";
import { LoginFormVaidationSchema } from "../../../validation/loginFormValidationSchema";
import { usePageLoader } from "../../../hooks/usePageLoader";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [login, setLogin] = useState<Login>({ username: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loader, showLoader, hideLoader } = usePageLoader();
  const { state } = useLocation();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...login };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setLogin(data);

    const checkedFieldError = await validateField(
      name,
      value,
      LoginFormVaidationSchema
    );
    const newErrors = { ...errors, [name]: checkedFieldError[name] };
    setErrors(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = await validate(LoginFormVaidationSchema, login);
    setErrors(errors || {});
    if (errors) return;

    try {
      showLoader();
      await doLogin(login);
      hideLoader();

      window.location.href = state ? state.from.pathname : "/";
    } catch (ex: any) {
      toast.error(ex.response.data.message);
    }
  };

  return (
    <>
      <Header text={"Login"} />
      <MainContainer className="form-container">
        <Form onSubmit={handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={login.username}
            onChange={handleChange}
            type="text"
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={login.password}
            onChange={handleChange}
            type="password"
            error={errors.password}
          />
          <SubmitButton className="btn btn-primary m-2" text="Login" />
        </Form>
        <>{loader}</>
      </MainContainer>
    </>
  );
};

export default LoginForm;
