import { date, object, string } from "yup";
import Author from "../types/author";

export const AuthorValidationSchema = object<Author>({
  firstName: string()
    .trim()
    .required("First name is required")
    .matches(/^[a-zA-Z\s-]*$/, "First name is invalid"),

  lastName: string()
    .trim()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s-]*$/, "Last name is invalid"),
  birthdate: date().required("Birth date is required"),
});
