import { SchemaOf, mixed, object, string } from "yup";
import UserAccount from "../types/userAccount";
import { LoginFormVaidationSchema } from "./loginFormValidationSchema";
import { Role } from "../types/enums/role";
import { MESSAGES } from "../constants/messages";

export const RegisterFormVaidationSchema: SchemaOf<UserAccount> = object({
  firstName: string()
    .trim()
    .required(MESSAGES.REQUIRED.FIRST_NAME)
    .matches(/^[a-zA-Z\s-]*$/, MESSAGES.VALID.FIRST_NAME),
  lastName: string()
    .trim()
    .required(MESSAGES.REQUIRED.LAST_NAME)
    .matches(/^[a-zA-Z\s-]*$/, MESSAGES.VALID.LAST_NAME),
  email: string()
    .trim()
    .required(MESSAGES.REQUIRED.EMAIL)
    .email(MESSAGES.VALID.EMAIL),
  phoneNumber: string()
    .trim()
    .required(MESSAGES.REQUIRED.PHONE_NUMBER)
    .matches(/\+[0-9]{10,}/, MESSAGES.VALID.PHONE_NUMBER),
  role: mixed<Role>()
    .oneOf(Object.values(Role) as Role[], MESSAGES.REQUIRED.ROLE)
    .required(),
  login: LoginFormVaidationSchema,
});
