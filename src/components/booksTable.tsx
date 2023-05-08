import { FC } from "react";
import Book from "../types/book";
import Table from "./base/table";
import Author from "../types/author";
import { Link } from "react-router-dom";

interface BooksTableProps {
  data: Book[];
  onDelete(authors: {}): void;
}

const BooksTable: FC<BooksTableProps> = ({ data, onDelete }) => {
  const columns = [
    {
      path: "title",
      label: "Title",
      content: (item: any) => (
        <Link to={`/books/${item.id}`}>{item.title}</Link>
      ),
    },
    {
      path: "publisher",
      label: "Publisher",
    },
    {
      path: "isbn",
      label: "ISBN",
    },
    {
      path: "yearOfPublication",
      label: "Year of publication",
    },
    {
      path: "price",
      label: "Price",
    },
    {
      path: "cover",
      label: "Cover",
    },

    {
      path: "authors",
      label: "Author(s)",
      content: (item: Book) => (
        <ul className="book-author-list">
          {item.authors.map((author: Author) => (
            <Link
              key={author.id}
              to={`/authors/${author.id}`}
            >{`${author.firstName} ${author.lastName}`}</Link>
          ))}
        </ul>
      ),
    },
  ];

  return <Table columns={columns} data={data} onDelete={onDelete} />;
};

export default BooksTable;
