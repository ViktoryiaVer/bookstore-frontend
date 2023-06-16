import { FC } from "react";
import _ from "lodash";
import Column from "../../types/column";
import useCurrentUser from "../../hooks/useCurrentUser";
import DeleteButton from "./DeleteButton";

interface TableBodyProps {
  data: any[];
  columns: Column[];
  onDelete(item: {}): void;
}

const TableBody: FC<TableBodyProps> = ({ data, columns, onDelete }) => {
  const { isAdmin } = useCurrentUser();

  return (
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          {columns.map((column) => (
            <td key={item.id + column.path}>{renderCell(item, column)}</td>
          ))}
          {isAdmin && (
            <td>
              <DeleteButton
                className="btn btn-danger btn-sm"
                onClick={() => onDelete(item.id)}
              />
            </td>
          )}
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
