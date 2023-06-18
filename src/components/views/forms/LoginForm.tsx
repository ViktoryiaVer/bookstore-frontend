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

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [login, setLogin] = useState<Login>({ username: "", password: "" });
  const { state } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...login };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setLogin(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await doLogin(login);
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
          />
          <Input
            name="password"
            label="Password"
            value={login.password}
            onChange={handleChange}
            type="password"
          />
          <SubmitButton className="btn btn-primary m-2" text="Login" />
        </Form>
      </MainContainer>
    </>
  );
};

export default LoginForm;
