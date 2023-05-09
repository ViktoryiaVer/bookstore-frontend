import http from "./httpService";
import config from "../config.json";
import Book from "../types/book";
import BookCreate from "../types/bookCreate";
import BookPageable from "../types/bookPageable";
import { getSearchParamsForPagination } from "../utils/pagingUtil";

const apiEndpoint = config.apiUrl + "books/";

function bookUrl(id: number) {
  return `${apiEndpoint}${id}`;
}

export function getBooks() {
  return http.get<BookPageable>(apiEndpoint);
}

export function getBooksWithParams(searchParams: URLSearchParams) {
  const params: {} = getSearchParamsForPagination(searchParams);
  return http.get<BookPageable>(apiEndpoint, {
    params: { ...params },
  });
}

export function getBook(bookId: number) {
  return http.get<Book>(bookUrl(bookId));
}

export function saveOrUpdateBook(book: BookCreate) {
  if (book.id) {
    return http.put<BookCreate>(apiEndpoint, book);
  }
  return http.post<BookCreate>(apiEndpoint, book);
}

export function deleteBook(bookId: number) {
  return http.delete(bookUrl(bookId));
}
