import Author from "../types/author";
import http from "./httpService";
import config from "../config.json";
import {
  getSearchParamsForAuthorFiltering,
  getSearchParamsForPagination,
} from "../utils/searchParamsUtil";
import ItemsWithPagination from "../types/itemsWithPagination";

const apiEndpoint = config.apiUrl + "authors";

function authorUrl(id: number) {
  return `${apiEndpoint}/${id}`;
}

export function getAuthors() {
  return http.get<ItemsWithPagination<Author>>(apiEndpoint);
}

export function getAuthorsWithParams(searchParams: URLSearchParams) {
  const pageParams = getSearchParamsForPagination(searchParams);
  const filterParams = getSearchParamsForAuthorFiltering(searchParams);

  return http.get<ItemsWithPagination<Author>>(apiEndpoint, {
    params: { ...pageParams, ...filterParams },
  });
}

export function getAuthor(authorId: number) {
  return http.get<Author>(authorUrl(authorId));
}

export function saveOrUpdateAuthor(author: Author) {
  if (author.id) {
    return http.put<Author>(apiEndpoint, author);
  }
  return http.post<Author>(apiEndpoint, author);
}

export function deleteAuthor(authorId: number) {
  return http.delete(authorUrl(authorId));
}
