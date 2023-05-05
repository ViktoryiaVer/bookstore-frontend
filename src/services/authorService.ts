import Author from "../types/author";
import http from "./httpService";

import config from "../config.json";

const apiEndpoint = config.apiUrl + "authors/";

function authorUrl(id: number) {
  return `${apiEndpoint}${id}`;
}

export function getAuthors() {
  return http.get<Array<Author>>(apiEndpoint);
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
