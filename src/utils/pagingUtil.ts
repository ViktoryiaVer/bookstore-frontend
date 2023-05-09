export const getSearchParamsForPagination = (searchParams: URLSearchParams) => {
  const pageNumber: number = Number(searchParams.get("page")) - 1;
  return { page: pageNumber };
};
