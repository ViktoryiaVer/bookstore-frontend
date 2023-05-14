import config from "../config.json";
import http from "./httpService";
import Login from "../types/login";
import Token from "../types/token";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import UserInfo from "../types/userInfo";
import UserAccount from "../types/userAccount";

const apiLoginEndpoint = config.apiUrl + "auth/login";
const apiSignupEndpoint = config.apiUrl + "auth/signup";
const tokenKey = "token";

http.setJwt(getJwt());

export function registerUser(user: UserAccount) {
  return http.post(apiSignupEndpoint, user);
}

export async function doLogin(doLogin: Login) {
  const { data } = await http.post<Token>(
    apiLoginEndpoint,
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
