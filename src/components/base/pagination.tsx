import { FC } from "react";
import _ from "lodash";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  onPageChange: any; //TODO define type
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
}) => {
  const pages = _.range(1, totalPages + 1);
  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
