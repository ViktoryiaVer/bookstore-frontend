import { FC } from "react";
import Header from "./base/header";

interface BooksProps {}

const Books: FC<BooksProps> = () => {
  return (
    <>
      <Header text="Books" />
    </>
  );
};

export default Books;
