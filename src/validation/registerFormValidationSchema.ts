import { SchemaOf, mixed, object, string } from "yup";
import UserAccount from "../types/userAccount";
import { LoginFormVaidationSchema } from "./loginFormValidationSchema";
import { Role } from "../types/enums/role";

export const RegisterFormVaidationSchema: SchemaOf<UserAccount> = object({
  firstName: string()
    .trim()
    .required("First name is required")
    .matches(/^[a-zA-Z\s-]*$/, "First name is invalid"),
  lastName: string()
    .trim()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s-]*$/, "Last name is invalid"),
  email: string()
    .trim()
    .required("Email is required")
    .email("Email is invalid"),
  phoneNumber: string()
    .trim()
    .required("Phone number is required")
    .matches(/\+[0-9]{10,}/, "Phone number is invalid"),
  role: mixed<Role>()
    .oneOf(Object.values(Role) as Role[], "Role is required")
    .required(),
  login: LoginFormVaidationSchema,

  //   "login.username": string()
  //     .trim()
  //     .required("Username is required")
  //     .matches(/^[A-Za-z]\w{5,29}$/, "Username is invalid"),
  //   "login.password": string()
  //     .trim()
  //     .required("Password is required")
  //     .matches(
  //       /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,}$/,
  //       "Password is invalid"
  //     ),
});
