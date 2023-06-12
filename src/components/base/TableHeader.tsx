import { FC } from "react";
import Column from "../../types/column";

interface TableHeaderProps {
  columns: Column[];
}

const TableHeader: FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column.path}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
