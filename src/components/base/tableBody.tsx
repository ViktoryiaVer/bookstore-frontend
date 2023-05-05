import { FC } from "react";
import _ from "lodash";
import Column from "../../types/column";

interface TableBodyProps {
  data: any[];
  columns: Column[];
  onDelete(item: {}): void;
}

const TableBody: FC<TableBodyProps> = ({ data, columns, onDelete }) => {
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={item.id + column.path}>{renderCell(item, column)}</td>
          ))}
          <td>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

function renderCell(item: {}, column: any) {
  if (column.content) return column.content(item);

  return _.get(item, column.path);
}

export default TableBody;
