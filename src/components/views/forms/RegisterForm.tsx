import { FC, useState } from "react";
import Header from "../../base/Header";
import Input from "../../base/Input";
import UserAccount from "../../../types/userAccount";
import { Role } from "../../../types/enums/role";
import { registerUser } from "../../../services/authenticationService";
import _ from "lodash";
import SubmitButton from "../../base/SubmitButton";
import Form from "../../base/Form";
import MainContainer from "../../base/MainContainer";
import { toast } from "react-toastify";
import { validate, validateField } from "../../../utils/validationUtils";
import { RegisterFormVaidationSchema } from "../../../validation/registerFormValidationSchema";
import { usePageLoader } from "../../../hooks/usePageLoader";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { loader, showLoader, hideLoader } = usePageLoader();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const data: any = { ...user };

    const { name, value } = event.currentTarget;
    _.set(data, name, value);
    setUser(data);

    const checkedFieldError = await validateField(
      name,
      value,
      RegisterFormVaidationSchema
    );
    const newErrors = { ...errors, [name]: checkedFieldError[name] };
    setErrors(newErrors);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const errors = await validate(RegisterFormVaidationSchema, user);
    setErrors(errors || {});
    if (errors) return;

    try {
      showLoader();
      await registerUser(user);
      hideLoader();

      window.location.href = "/login";
    } catch (ex: any) {
      toast.error(ex.response.data.message);
      console.log(ex.response.data);
    }
  };

  return (
    <>
      <Header text={"Register"} />
      <MainContainer className="form-container">
        <Form onSubmit={handleSubmit}>
          <Input
            name="firstName"
            label="First name"
            value={user.firstName}
            onChange={handleChange}
            type="text"
            error={errors.firstName}
          />
          <Input
            name="lastName"
            label="Last name"
            value={user.lastName}
            onChange={handleChange}
            type="text"
            error={errors.lastName}
          />
          <Input
            name="email"
            label="Email"
            value={user.email}
            onChange={handleChange}
            type="email"
            error={errors.email}
          />
          <Input
            name="phoneNumber"
            label="Phone number"
            value={user.phoneNumber}
            onChange={handleChange}
            type="tel"
            error={errors.phoneNumber}
          />
          <Input
            name="login.username"
            label="Username"
            value={user.login.username}
            onChange={handleChange}
            type="text"
            error={errors["login.username"]}
          />
          <Input
            name="login.password"
            label="Password"
            value={user.login.password}
            onChange={handleChange}
            type="password"
            error={errors["login.password"]}
          />
          <SubmitButton className="btn btn-primary m-2" text="Register" />
        </Form>
        <>{loader}</>
      </MainContainer>
    </>
  );
};

export default RegisterForm;
