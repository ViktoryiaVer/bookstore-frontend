import { SchemaOf, object, string } from "yup";
import Login from "../types/login";
import { MESSAGES } from "../constants/messages";

export const LoginFormVaidationSchema: SchemaOf<Login> = object({
  username: string().trim().required(MESSAGES.REQUIRED.USERNAME),
  password: string().trim().required(MESSAGES.REQUIRED.PASSWORD),
});
