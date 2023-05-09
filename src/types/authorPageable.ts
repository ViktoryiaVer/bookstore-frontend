import Author from "./author";

type AuthorPageable = {
  authors: Author[];
  totalPages: number;
  pageable: {};
};

export default AuthorPageable;
