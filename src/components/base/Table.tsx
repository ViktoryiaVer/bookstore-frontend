import { FC } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Column from "../../types/column";

interface TableProps {
  data: any[];
  columns: Column[];
  onDelete(item: {}): void;
}

const Table: FC<TableProps> = ({ data, columns, onDelete }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} />
      <TableBody data={data} columns={columns} onDelete={onDelete} />
    </table>
  );
};

export default Table;
