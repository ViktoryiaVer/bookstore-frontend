export const getSearchParamsForPagination = (searchParams: URLSearchParams) => {
  const pageNumber: number = Number(searchParams.get("page"));
  const pageToSend = pageNumber <= 0 ? 0 : pageNumber - 1;

  return { page: pageToSend };
};

export const getSearchParamsForAuthorFiltering = (
  searchParams: URLSearchParams
) => {
  const lastName: string | null = searchParams.get("lastName");
  return { lastName: lastName };
};
