import { SchemaOf, object, string } from "yup";
import Login from "../types/login";

export const LoginFormVaidationSchema: SchemaOf<Login> = object({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});
