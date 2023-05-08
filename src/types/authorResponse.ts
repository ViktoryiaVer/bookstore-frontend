import Author from "./author";

type AuthorResponse = {
  authors: Author[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

export default AuthorResponse;
