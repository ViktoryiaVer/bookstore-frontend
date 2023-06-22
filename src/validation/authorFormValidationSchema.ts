import { SchemaOf, number, object, string } from "yup";
import Author from "../types/author";
import { MESSAGES } from "../constants/messages";

export const AuthorFormValidationSchema: SchemaOf<Author> = object({
  id: number(),
  firstName: string()
    .trim()
    .required(MESSAGES.REQUIRED.FIRST_NAME)
    .matches(/^[a-zA-Z\s-]*$/, MESSAGES.VALID.FIRST_NAME),
  lastName: string()
    .trim()
    .required(MESSAGES.REQUIRED.LAST_NAME)
    .matches(/^[a-zA-Z\s-]*$/, MESSAGES.VALID.LAST_NAME),
  birthdate: string().required(MESSAGES.REQUIRED.BIRTHDATE),
});
