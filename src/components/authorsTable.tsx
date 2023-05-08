import { FC } from "react";
import Table from "./base/table";
import Author from "../types/author";
import { Link } from "react-router-dom";

interface AuthorsTableProps {
  data: Author[];
  onDelete(item: {}): void;
}

const AuthorsTable: FC<AuthorsTableProps> = ({ data, onDelete }) => {
  const columns = [
    {
      path: "firstName",
      label: "First Name",
      content: (item: any) => (
        <Link to={`/authors/${item.id}`}>{item.firstName}</Link>
      ),
    },
    {
      path: "lastName",
      label: "Last Name",
      content: (item: any) => (
        <Link to={`/authors/${item.id}`}>{item.lastName}</Link>
      ),
    },
    {
      path: "birthdate",
      label: "Birth date",
    },
  ];

  return <Table columns={columns} data={data} onDelete={onDelete} />;
};

export default AuthorsTable;
