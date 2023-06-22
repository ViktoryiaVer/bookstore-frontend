export const MESSAGES = {
  REQUIRED: {
    FIRST_NAME: "First name is required",
    LAST_NAME: "Last name is required",
    BIRTHDATE: "Birthdate is required",
    EMAIL: "Email is required",
    USERNAME: "Username is required",
    PASSWORD: "Password is required",
    PHONE_NUMBER: "Phone number is required",
    ROLE: "Role is required",
    TITLE: "Title is required",
    PUBLISHER: "Publisher is required",
    ISBN: "ISBN is required",
    YEAR_OF_PUBLICATION: "Year of publication is required",
    PRICE: "Price is required",
    COVER: "Cover is required",
    AUTHORS: "Authors are required",
  },
  VALID: {
    FIRST_NAME: "First name is invalid",
    LAST_NAME: "Last name is invalid",
    EMAIL: "Email is invalid",
    PHONE_NUMBER: "Phone number is invalid",
    YEAR_OF_PUBLICATION_MIN:
      "Year of publication should be not earlier than 1800",
    YEAR_OF_PUBLICATION_MAX:
      "Year of publication should be not later than 2100",
    PRICE_MIN: "Price cannot be zero",
    PRICE_MAX: "Price cannot be higher than 10000",
    AUTHORS_LENGTH: "At least one author should be specified",
  },
};

export const TOASTS = {
  LOGIN_REQUIRED: "Please, login to see this content",
  FORBIDDEN: "You have insufficient rights to see this content",
};
