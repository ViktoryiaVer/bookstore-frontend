import Author from "../types/author";
import http from "./httpService";
import config from "../config.json";
import AuthorPageable from "../types/authorPageable";
import { getSearchParamsForPagination } from "../utils/pagingUtil";

const apiEndpoint = config.apiUrl + "authors";

function authorUrl(id: number) {
  return `${apiEndpoint}/${id}`;
}

export function getAuthors() {
  return http.get<AuthorPageable>(apiEndpoint);
}

export function getAuthorsWithParams(searchParams: URLSearchParams) {
  const params: {} = getSearchParamsForPagination(searchParams);
  return http.get<AuthorPageable>(apiEndpoint, {
    params: { ...params },
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
