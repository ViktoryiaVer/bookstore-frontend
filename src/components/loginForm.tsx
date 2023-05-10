import { FC, useState } from "react";
import Header from "./base/header";
import Input from "./base/input";
import Login from "../types/login";
import { doLogin } from "../services/authenticationService";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => {
  const [login, setLogin] = useState<Login>({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...login };
    const { name, value } = event.currentTarget;
    data[name] = value;
    setLogin(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    doLogin(login);
    navigate("/");
  };

  return (
    <>
      <Header text={"Login"} />
      <main className="form-container">
        <form onSubmit={handleSubmit} className="form">
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
          <button type="submit" className="btn btn-primary m-2">
            Login
          </button>
        </form>
      </main>
    </>
  );
};

export default LoginForm;
