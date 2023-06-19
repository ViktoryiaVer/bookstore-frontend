import { SchemaOf, array, mixed, number, object, string } from "yup";
import BookCreate from "../types/bookCreate";
import { Cover } from "../types/enums/cover";

export const BookFormValidationSchema: SchemaOf<BookCreate> = object({
  id: number(),
  title: string().trim().required("Title is required"),
  publisher: string().trim().required("Publisher is required"),
  isbn: string().trim().required("ISBN is required"),
  yearOfPublication: number()
    .required("Year of publication is required")
    .min(1800, "Year of publication is invalid")
    .max(2100, "Year of publication is invalid"),
  price: number()
    .required("Price is required")
    .min(0.01, "Price is invalid")
    .max(10000.0, "Price is invalid"),
  cover: mixed<Cover>()
    .oneOf(
      Object.values(Cover).filter(
        (value) => typeof value === "string"
      ) as Cover[],
      "Cover is required"
    )
    .required(),
  authorIds: array<Number>()
    .required("Authors are required")
    .min(1, "At least one author should be specified"),
});
