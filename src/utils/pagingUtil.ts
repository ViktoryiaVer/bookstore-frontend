export const getSearchParamsForPagination = (searchParams: URLSearchParams) => {
  const pageNumber: number = Number(searchParams.get("page"));
  const pageToSend = pageNumber <= 0 ? 0 : pageNumber - 1;
  const lastName: string | null = searchParams.get("lastName");
  return { page: pageToSend, lastName: lastName };
};
