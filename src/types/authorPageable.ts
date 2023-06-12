import Author from "./author";

type AuthorPageable = {
  authors: Author[];
  totalPages: number;
};

export default AuthorPageable;
