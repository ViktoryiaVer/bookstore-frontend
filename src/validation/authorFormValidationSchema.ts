import { SchemaOf, number, object, string } from "yup";
import Author from "../types/author";

export const AuthorFormValidationSchema: SchemaOf<Author> = object({
  id: number(),
  firstName: string()
    .trim()
    .required("First name is required")
    .matches(/^[a-zA-Z\s-]*$/, "First name is invalid"),
  lastName: string()
    .trim()
    .required("Last name is required")
    .matches(/^[a-zA-Z\s-]*$/, "Last name is invalid"),
  birthdate: string().required("Birth date is required"),
});
