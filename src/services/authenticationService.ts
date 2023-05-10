import config from "../config.json";
import http from "./httpService";
import Login from "../types/login";
import Token from "../types/token";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

const apiEndpoint = config.apiUrl + "auth/login";
const tokenKey = "token";

http.setJwt(getJwt());

export async function doLogin(doLogin: Login) {
  const { data } = await http.post<Token>(
    apiEndpoint,
    {},
    { auth: { ...doLogin } }
  );

  setCookie(data);
}

function setCookie(data: Token) {
  if (Cookie.get(tokenKey) != null) {
    Cookie.remove(tokenKey);
  }

  Cookie.set(tokenKey, data.token);
  console.log(Cookie.get(tokenKey));
}

export function getCurrentUser() {
  const jwt = Cookie.get(tokenKey);
  if (jwt) {
    return jwtDecode(jwt);
  }
}

export function getJwt() {
  return Cookie.get(tokenKey);
}
