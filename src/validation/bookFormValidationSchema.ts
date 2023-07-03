import { SchemaOf, array, mixed, number, object, string } from "yup";
import BookCreate from "../types/bookCreate";
import { Cover } from "../types/enums/cover";
import { MESSAGES } from "../constants/messages";

export const BookFormValidationSchema: SchemaOf<BookCreate> = object({
  id: number(),
  title: string().trim().required(MESSAGES.REQUIRED.TITLE),
  publisher: string().trim().required(MESSAGES.REQUIRED.PUBLISHER),
  isbn: string().trim().required(MESSAGES.REQUIRED.ISBN),
  yearOfPublication: number()
    .required(MESSAGES.REQUIRED.YEAR_OF_PUBLICATION)
    .min(1800, MESSAGES.VALID.YEAR_OF_PUBLICATION_MIN)
    .max(2100, MESSAGES.VALID.YEAR_OF_PUBLICATION_MAX),
  price: number()
    .required(MESSAGES.REQUIRED.PRICE)
    .min(0.01, MESSAGES.VALID.PRICE_MIN)
    .max(10000.0, MESSAGES.VALID.PRICE_MAX),
  cover: mixed<Cover>()
    .oneOf(Object.values(Cover), MESSAGES.REQUIRED.COVER)
    .required(),
  authorIds: array<Number>()
    .required(MESSAGES.REQUIRED.AUTHORS)
    .min(1, MESSAGES.VALID.AUTHORS_LENGTH),
});
