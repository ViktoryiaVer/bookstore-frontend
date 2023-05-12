import config from "../config.json";
import http from "./httpService";
import Login from "../types/login";
import Token from "../types/responseWithToken";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import UserInfo from "../types/userInfoForContext";

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
}

export function doLogout() {
  Cookie.remove(tokenKey);
}

export function getCurrentUser(): UserInfo | undefined {
  const jwt = Cookie.get(tokenKey);
  if (jwt) {
    const { sub: username, role } = jwtDecode(jwt) as {
      sub: string;
      role: string;
    };
    console.log(username);
    return { username, role };
  }
}

export function getJwt() {
  return Cookie.get(tokenKey);
}
