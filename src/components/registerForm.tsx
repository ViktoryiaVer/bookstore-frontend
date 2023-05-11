import { FC, useState } from "react";
import Header from "./base/header";
import Input from "./base/input";
import UserAccount from "../types/userAccount";
import { Role } from "../types/enums/role";
import { registerUser } from "../services/authenticationService";
import _ from "lodash";

interface RegisterFormProps {}

const RegisterForm: FC<RegisterFormProps> = () => {
  const [user, setUser] = useState<UserAccount>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: Role.USER,
    login: { username: "", password: "" },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...user };

    const { name, value } = event.currentTarget;
    console.log(name);
    _.set(data, name, value);
    setUser(data);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(user);
    await registerUser(user);
    window.location.href = "/login";
  };

  return (
    <>
      <Header text={"Register"} />
      <main className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <Input
            name="firstName"
            label="First name"
            value={user.firstName}
            onChange={handleChange}
            type="text"
          />

          <Input
            name="lastName"
            label="Last name"
            value={user.lastName}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            name="phoneNumber"
            label="Phone number"
            value={user.phoneNumber}
            onChange={handleChange}
            type="tel"
          />
          <Input
            name="login.username"
            label="Username"
            value={user.login.username}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="login.password"
            label="Password"
            value={user.login.password}
            onChange={handleChange}
            type="password"
          />
          <button type="submit" className="btn btn-primary m-2">
            Register
          </button>
        </form>
      </main>
    </>
  );
};

export default RegisterForm;
