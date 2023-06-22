import { SEARCH_PARAMS } from "../constants/searchParams";

export const getSearchParamsForPagination = (searchParams: URLSearchParams) => {
  const pageNumber: number = Number(searchParams.get(SEARCH_PARAMS.PAGE));
  const pageToSend = pageNumber <= 0 ? 0 : pageNumber - 1;

  return { page: pageToSend };
};

export const getSearchParamsForAuthorFiltering = (
  searchParams: URLSearchParams
) => {
  const lastName: string | null = searchParams.get(SEARCH_PARAMS.LASTNAME);
  return { lastName: lastName };
};
