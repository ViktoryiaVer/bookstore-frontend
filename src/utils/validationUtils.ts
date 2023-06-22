import { ObjectSchema, ValidationError } from "yup";

export const validate = async (
  schema: ObjectSchema<any>,
  itemToValidate: any
) => {
  try {
    await schema.validate(itemToValidate, { abortEarly: false });
    return null;
  } catch (err: any) {
    const validationErrors: { [key: string]: string } = {};
    err.inner.forEach((error: ValidationError) => {
      validationErrors[error.path as string] = error.message;
    });
    return validationErrors;
  }
};

export const validateField = async (
  name: string,
  value: any,
  schema: ObjectSchema<any>
) => {
  try {
    await schema.validateAt(name, { [name]: value }, { abortEarly: false });
    return { [name]: "" };
  } catch (err: any) {
    return { [name]: err.message };
  }
};
